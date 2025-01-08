const PeminjamanBarang = require('../models/peminjaman-barang-model');
const BarangInventaris = require('../models/barang-inventaris-model');

const peminjamanBarangController = {
    
    getAll: async (req, res) => {
        try {
            const data = await PeminjamanBarang.getAll();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data peminjaman.' });
        }
    },

    create: async (req, res) => {
        try {
            const { id_user, id_barang, tanggal_peminjaman, tanggal_pengembalian, status_peminjaman } = req.body;
            const idPeminjaman = await PeminjamanBarang.create({
                id_user,
                id_barang,
                tanggal_peminjaman,
                tanggal_pengembalian,
                status_peminjaman
            });
            // Update status barang menjadi 'Dipinjam'
            await BarangInventaris.updateStatusBarang(id_barang, 'Dipinjam');
            res.status(201).json({ message: 'Data peminjaman berhasil ditambahkan.', id_peminjaman: idPeminjaman });
        } catch (error) {
            res.status(500).json({ error: 'Terjadi kesalahan saat menambahkan data peminjaman.' });
        }
    },

    delete: async (req, res) => {
        try {
            await PeminjamanBarang.delete(req.params.id_peminjaman);
            res.json({ message: 'Data peminjaman berhasil dihapus.' });
        } catch (error) {
            res.status(500).json({ error: 'Terjadi kesalahan saat menghapus data peminjaman.' });
        }
    },

    // Fungsi untuk mengubah status barang menjadi dipinjam
    setujuiPeminjaman: async (req, res) => {
        const { id_peminjaman, id_barang } = req.params;
        try {
            await PeminjamanBarang.updateStatusPeminjaman(id_peminjaman, 'Dipinjam');
            await BarangInventaris.updateStatusBarang(id_barang, 'Dipinjam');
            res.json({ message: 'Peminjaman disetujui dan barang dipinjam' });
        } catch (error) {
            res.status(500).json({ error: 'Terjadi kesalahan saat menyetujui peminjaman.' });
        }
    },

    tolakPeminjaman: async (req, res) => {
        const { id_peminjaman } = req.params;
        try {
            // Mengubah status peminjaman menjadi 'Ditolak'
            await PeminjamanBarang.updateStatusPeminjaman(id_peminjaman, 'Ditolak');
            
            // Mengambil data peminjaman untuk mendapatkan id_barang
            const peminjaman = await PeminjamanBarang.getById(id_peminjaman);
            const { id_barang } = peminjaman;
            
            // Mengembalikan status barang menjadi 'Tersedia'
            await BarangInventaris.updateStatusBarang(id_barang, 'Tersedia');
            
            res.json({ message: 'Peminjaman ditolak dan barang dikembalikan ke inventaris.' });
        } catch (error) {
            res.status(500).json({ error: 'Terjadi kesalahan saat menolak peminjaman.' });
        }
    },
    
    // Fungsi untuk mengubah status barang kembali tersedia
    selesaiPeminjaman: async (req, res) => {
        const { id_peminjaman, id_barang } = req.params;
        try {
            await PeminjamanBarang.updateStatusPeminjaman(id_peminjaman, 'Selesai');
            await BarangInventaris.updateStatusBarang(id_barang, 'Tersedia');
            res.json({ message: 'Peminjaman selesai dan barang dikembalikan ke inventaris.' });
        } catch (error) {
            res.status(500).json({ error: 'Terjadi kesalahan saat menyelesaikan peminjaman.' });
        }
    },

    periksaStatusTerlambat: async (req, res) => {
        try {
            const terlambat = await PeminjamanBarang.periksaStatusTerlambat();
            res.json({ message: 'Status terlambat diperiksa.', data: terlambat });
        } catch (error) {
            res.status(500).json({ error: 'Terjadi kesalahan saat memeriksa status terlambat.' });
        }
    }
    
};

module.exports = peminjamanBarangController;
