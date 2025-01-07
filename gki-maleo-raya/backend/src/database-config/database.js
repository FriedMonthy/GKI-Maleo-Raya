const mysql = require('mysql2');
const util = require('util');

// Konfigurasi Koneksi Database
const koneksi = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'uas_gki_maleo_raya'
});

// Mengubah koneksi.query menjadi promise-based
koneksi.query = util.promisify(koneksi.query);

// Tes Koneksi Database
koneksi.connect((err) => {
    if (err) {
        console.error('Koneksi ke database gagal:', err);
        return;
    }

    console.log('Terhubung ke database.');
    
});

module.exports = koneksi;
