const express = require('express');
const router = express.Router();
const { loginJemaat, isAuthenticated } = require('../controllers/jemaat-login-controller');

// Fungsi routing login ke halaman home setelah login
// Endpoint POST untuk login jemaat
router.post('/api/jemaat-login', loginJemaat);

// Endpoint GET untuk halaman home jemaat yang dilindungi
router.get('/jemaat-home', isAuthenticated, (req, res) => {
    res.json({ message: 'Selamat datang di halaman jemaat!', user: req.session.user });
});

module.exports = router;
