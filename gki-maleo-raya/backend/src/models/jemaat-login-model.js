const koneksi = require('../database-config/database');

// Fungsi untuk memeriksa pengguna berdasarkan email dan password dan memastikan role-nya adalah sebagai 'jemaat'
const loginJemaatByEmailAndPassword = (email, password, callback) => {
    const query = `
        SELECT users.id_user, users.email, users.password, jemaat.nama_jemaat
        FROM users
        JOIN jemaat ON users.id_user = jemaat.id_user
        WHERE users.email = ? AND users.password = ? AND users.role = "jemaat"
    `;
    koneksi.query(query, [email, password], (err, results) => {
        callback(err, results); // Menggunakan callback untuk mengembalikan hasil atau error
    });
};

module.exports = { loginJemaatByEmailAndPassword };
