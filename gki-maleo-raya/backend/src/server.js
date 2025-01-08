const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const cors = require('cors'); // Mengimpor CORS
const path = require('path');

const adminLoginRoutes = require('./routes/admin-login-route');
const jemaatLoginRoutes = require('./routes/jemaat-login-route');

const barangInventarisRoutes = require('./routes/barang-inventaris-route');
const peminjamanBarangRoutes = require('./routes/peminjaman-barang-route');

const dataJemaatRoutes = require('./routes/data-jemaat-route');


const peminjamanBarangController = require('./controllers/peminjaman-barang-controller');


const app = express();

// Middleware CORS
app.use(cors()); // Menggunakan CORS

// Middleware untuk body-parser
app.use(bodyParser.json());

// Konfigurasi session
app.use(session({
    secret: 'gki-maleo-raya',  // Ganti dengan kunci rahasia yang aman
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Gunakan secure: true untuk HTTPS
}));

// Set cron job untuk memeriksa status terlambat setiap hari pada pukul 00:00
cron.schedule('0 0 * * *', () => {
    peminjamanBarangController.periksaStatusTerlambat();
  });

// Penggunaan Route untuk Login
app.use('/admin', adminLoginRoutes);
app.use('/jemaat', jemaatLoginRoutes);

// Penggunaan Route untuk Data Jemaat
app.use('/api/data-jemaat', dataJemaatRoutes);

// Penggunaan Route untuk Barang Inventaris dan Peminjaman Barang
app.use('/api/barang-inventaris', barangInventarisRoutes);
app.use('/api/peminjaman-barang', peminjamanBarangRoutes);

// Variabel host dan port
const port = 3000;

// Jalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
