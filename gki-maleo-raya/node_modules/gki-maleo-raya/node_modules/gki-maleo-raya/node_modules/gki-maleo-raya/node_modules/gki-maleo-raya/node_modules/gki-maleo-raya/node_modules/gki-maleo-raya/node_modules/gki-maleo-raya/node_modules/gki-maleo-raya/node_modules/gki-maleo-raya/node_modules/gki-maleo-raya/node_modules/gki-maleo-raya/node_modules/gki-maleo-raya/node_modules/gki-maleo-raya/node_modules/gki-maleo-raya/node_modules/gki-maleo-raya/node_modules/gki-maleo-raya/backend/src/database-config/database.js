const mysql = require('mysql2');

// Konfigurasi Koneksi Database
const koneksi = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gki_maleo_raya'
});

// Tes Koneksi Database
koneksi.connect((err) => {
    if (err) {
        console.error('Koneksi ke database gagal:', err);
        return;
    }

    console.log('Terhubung ke database.');
    
});

module.exports = koneksi;
