const koneksi = require('../database-config/database');

// Fungsi untuk memeriksa pengguna berdasarkan email dan password
const loginAdminByEmailAndPassword = (email, password, callback) => {
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    koneksi.query(query, [email, password], (err, results) => {
        callback(err, results); // Menggunakan callback untuk mengembalikan hasil atau error
    });
};

module.exports = { loginAdminByEmailAndPassword };
