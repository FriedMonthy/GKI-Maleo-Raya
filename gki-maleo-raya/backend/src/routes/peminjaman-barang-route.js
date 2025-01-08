const express = require('express');
const router = express.Router();
const peminjamanBarangController = require('../controllers/peminjaman-barang-controller');

// Fungsi Routing Peminjaman
router.get('/', peminjamanBarangController.getAll);
router.post('/', peminjamanBarangController.create);
router.delete('/:id_peminjaman', peminjamanBarangController.delete);

// Routing untuk Setujui, Tolak, dan Selesai
router.patch('/:id_peminjaman/setujui/:id_barang', peminjamanBarangController.setujuiPeminjaman);
router.patch('/:id_peminjaman/tolak', peminjamanBarangController.tolakPeminjaman);
router.patch('/:id_peminjaman/selesai/:id_barang', peminjamanBarangController.selesaiPeminjaman);

// Routing untuk memeriksa status terlambat
router.patch('/periksa-status-terlambat', peminjamanBarangController.periksaStatusTerlambat);

module.exports = router;
