const koneksi = require('../database-config/database');

// Fungsi untuk memeriksa pengguna berdasarkan email dan password dan memastikan role-nya adalah sebagai 'admin'
const loginAdminByEmailAndPassword = (email, password, callback) => {
    const query = 'SELECT * FROM users WHERE email = ? AND password = ? AND role = "admin"';
    koneksi.query(query, [email, password], (err, results) => {
        callback(err, results); // Menggunakan callback untuk mengembalikan hasil atau error
    });
};

module.exports = { loginAdminByEmailAndPassword };
