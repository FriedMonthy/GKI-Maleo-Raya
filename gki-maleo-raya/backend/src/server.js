const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors'); // Mengimpor CORS
const path = require('path');
const loginRoutes = require('../src/routes/admin-login-route'); // Import login routes untuk admin
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

// Gunakan route login
app.use('/api', loginRoutes);

// Variabel host dan port
const port = 3000;

// Jalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
