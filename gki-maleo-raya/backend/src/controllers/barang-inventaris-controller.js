const BarangInventaris = require('../models/barang-inventaris-model');

// Fungsi Controller untuk Barang Inventaris
const barangInventarisController = {
    getAll: async (req, res) => {
        try {
            const data = await BarangInventaris.getAll();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data barang inventaris.' });
        }
    },

    getById: async (req, res) => {
        try {
            const data = await BarangInventaris.getById(req.params.id_barang);
            if (!data) {
                return res.status(404).json({ error: 'Data tidak ditemukan.' });
            }
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data.' });
        }
    },

    create: async (req, res) => {
        try {
            const id = await BarangInventaris.create(req.body);
            res.status(201).json({ message: 'Data berhasil ditambahkan.', id });
        } catch (error) {
            res.status(500).json({ error: 'Terjadi kesalahan saat menambahkan data.' });
        }
    },

    update: async (req, res) => {
        try {
            await BarangInventaris.update(req.params.id_barang, req.body);
            res.json({ message: 'Data berhasil diperbarui.' });
        } catch (error) {
            res.status(500).json({ error: 'Terjadi kesalahan saat memperbarui data.' });
        }
    },

    delete: async (req, res) => {
        try {
            await BarangInventaris.delete(req.params.id_barang);
            res.json({ message: 'Data berhasil dihapus.' });
        } catch (error) {
            res.status(500).json({ error: 'Terjadi kesalahan saat menghapus data.' });
        }
    },
};

module.exports = barangInventarisController;
