const express = require('express');
const router = express.Router();
const { loginUser, isAuthenticated } = require('../controllers/login-controller');

// Fungsi routing login ke halaman home setelah login
// Endpoint POST untuk login
router.post('/login', loginUser);

// Endpoint GET untuk halaman home yang dilindungi
router.get('/home', isAuthenticated, (req, res) => {
    res.json({ message: 'Selamat datang di halaman home!', user: req.session.user });
});

module.exports = router;
