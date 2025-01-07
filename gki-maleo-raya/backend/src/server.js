const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors'); // Mengimpor CORS
const path = require('path');

const adminLoginRoutes = require('./routes/admin-login-route');
const jemaatLoginRoutes = require('./routes/jemaat-login-route');

const barangInventarisRoutes = require('./routes/barang-inventaris-route');


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

// Penggunaan Route untuk Login
app.use('/admin', adminLoginRoutes);
app.use('/jemaat', jemaatLoginRoutes);

// Penggunaa Route untuk Barang Inventaris
app.use('/api/barang-inventaris', barangInventarisRoutes);

// Variabel host dan port
const port = 3000;

// Jalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
