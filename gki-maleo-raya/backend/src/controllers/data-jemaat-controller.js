const DataJemaat = require('../models/data-jemaat-model');

// Fungsi Controller Jemaat
const dataJemaatController = {
    getAll: async (req, res) => {
        try {
            const data = await DataJemaat.getAll();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data jemaat.' });
        }
    },

    getById: async (req, res) => {
        try {
            const data = await Jemaat.getById(req.params.id_jemaat);
            if (!data) {
                return res.status(404).json({ error: 'Data tidak ditemukan.' });
            }
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data jemaat.' });
        }
    },

    create: async (req, res) => {
        try {
            await Jemaat.create(req.body);
            res.status(201).json({ message: 'Data berhasil ditambahkan.' });
        } catch (error) {
            res.status(500).json({ error: 'Terjadi kesalahan saat menambahkan data jemaat.' });
        }
    },

    update: async (req, res) => {
        try {
            await DataJemaat.update(req.params.id_jemaat, req.body);
            res.json({ message: 'Data berhasil diperbarui.' });
        } catch (error) {
            res.status(500).json({ error: 'Terjadi kesalahan saat memperbarui data jemaat.' });
        }
    },

    delete: async (req, res) => {
        try {
            await DataJemaat.delete(req.params.id_jemaat);
            res.json({ message: 'Data berhasil dihapus.' });
        } catch (error) {
            res.status(500).json({ error: 'Terjadi kesalahan saat menghapus data jemaat.' });
        }
    }
};

module.exports = dataJemaatController;
