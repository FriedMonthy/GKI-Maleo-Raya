const koneksi = require('../database-config/database');

// Fungsi untuk login
const loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email dan Password harus diisi!' });
    }

    // Query untuk memeriksa pengguna di database
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    koneksi.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json({ message: 'Internal server error.' });
        }

        if (results.length > 0) {
            // Simpan informasi pengguna di session
            req.session.user = { id: results[0].id, email: results[0].email };

            return res.status(200).json({
                message: 'Login berhasil!',
                user: req.session.user,
            });
        } else {
            return res.status(401).json({ message: 'Email atau Password salah!' });
        }
    });
};

// Middleware untuk melindungi rute agar hanya bisa diakses jika sudah login
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        return res.status(401).json({ message: 'Anda harus login terlebih dahulu.' });
    }
};

module.exports = { loginUser, isAuthenticated };
