const express = require('express');
const router = express.Router();
const barangInventarisController = require('../controllers/barang-inventaris-controller');

// Fungsi Routing Barang Inventaris
router.get('/', barangInventarisController.getAll);
router.get('/:id_barang', barangInventarisController.getById);
router.post('/', barangInventarisController.create);
router.put('/:id_barang', barangInventarisController.update);
router.delete('/:id_barang', barangInventarisController.delete);

module.exports = router;
