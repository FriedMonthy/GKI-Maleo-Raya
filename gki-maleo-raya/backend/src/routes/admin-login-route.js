const express = require('express');
const router = express.Router();
const { loginAdmin, isAuthenticated } = require('../controllers/admin-login-controller');

// Fungsi routing login ke halaman home setelah login
// Endpoint POST untuk login admin
router.post('/api/admin-login', loginAdmin);

// Endpoint GET untuk halaman home admin yang dilindungi
router.get('/admin-home', isAuthenticated, (req, res) => {
    res.json({ message: 'Selamat datang di halaman home!', user: req.session.user });
});

module.exports = router;
