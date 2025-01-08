const koneksi = require('../database-config/database');

// Fungsi Model Peminjaman Barang
const PeminjamanBarang = {
    getAll: async () => {
        const query = `
            SELECT peminjaman_barang.*, jemaat.nama_jemaat AS nama_peminjam, barang_inventaris.nama_barang
            FROM peminjaman_barang
            JOIN jemaat ON peminjaman_barang.id_user = jemaat.id_user
            JOIN barang_inventaris ON peminjaman_barang.id_barang = barang_inventaris.id_barang
        `;
        const rows = await koneksi.query(query);
        return rows;
    },

    create: async (data) => {
        // Cari ID yang sudah terhapus
        const queryFindAvailableId = `
            SELECT id_peminjaman
            FROM peminjaman_barang
            WHERE id_peminjaman NOT IN (SELECT id_peminjaman FROM peminjaman_barang)
            ORDER BY id_peminjaman ASC LIMIT 1
        `;
        const availableIdResult = await koneksi.query(queryFindAvailableId);

        let newIdPeminjaman;

        // Jika ada ID yang kosong, gunakan ID tersebut
        if (availableIdResult.length > 0) {
            newIdPeminjaman = availableIdResult[0].id_peminjaman;
        } else {
            // Jika tidak ada ID kosong, gunakan ID auto-increment yang baru
            const query = `
                INSERT INTO peminjaman_barang
                (id_user, id_barang, tanggal_peminjaman, tanggal_pengembalian, status_verifikasi, status_peminjaman) 
                VALUES (?, ?, ?, ?, 'Menunggu Persetujuan', ?)
            `;
            const result = await koneksi.query(query, [
                data.id_user,
                data.id_barang,
                data.tanggal_peminjaman,
                data.tanggal_pengembalian,
                data.status_peminjaman
            ]);
            return result.insertId;  // Mengembalikan ID yang baru di-generate oleh MySQL
        }

        // Jika ada ID yang ditemukan, gunakan untuk insert data
        const query = `
            INSERT INTO peminjaman_barang
            (id_peminjaman, id_user, id_barang, tanggal_peminjaman, tanggal_pengembalian, status_verifikasi, status_peminjaman) 
            VALUES (?, ?, ?, ?, ?, 'Menunggu Persetujuan', ?)
        `;
        const result = await koneksi.query(query, [
            newIdPeminjaman,  // Menggunakan ID yang ditemukan
            data.id_user,
            data.id_barang,
            data.tanggal_peminjaman,
            data.tanggal_pengembalian,
            data.status_peminjaman
        ]);
        return result.insertId;  // Optional: mengembalikan ID baru
    },

    delete: async (id_peminjaman) => {
        const query = 'DELETE FROM peminjaman_barang WHERE id_peminjaman = ?';
        await koneksi.query(query, [id_peminjaman]);
    },

    // Fungsi untuk mengubah status verifikasi menjadi Disetujui atau Ditolak
    updateStatusVerifikasi: async (id_peminjaman, status) => {
        const query = 'UPDATE peminjaman_barang SET status_verifikasi = ? WHERE id_peminjaman = ?';
        await koneksi.query(query, [status, id_peminjaman]);
    },

    // Fungsi untuk mengubah status peminjaman menjadi Dipinjam atau Selesai
    updateStatusPeminjaman: async (id_peminjaman, status) => {
        const query = 'UPDATE peminjaman_barang SET status_peminjaman = ? WHERE id_peminjaman = ?';
        await koneksi.query(query, [status, id_peminjaman]);
    },

    // Fungsi untuk memperbarui status barang di inventaris
    updateStatusBarang: async (id_barang, status) => {
        const query = 'UPDATE barang_inventaris SET status_barang = ? WHERE id_barang = ?';
        await koneksi.query(query, [status, id_barang]);
    },

    // Fungsi untuk memeriksa status terlambat
    updateStatusTerlambat: async () => {
        const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
        const query = `
            UPDATE peminjaman_barang
            SET status_peminjaman = 'Terlambat'
            WHERE tanggal_pengembalian < ? AND status_peminjaman != 'Selesai'
        `;
        await koneksi.query(query, [today]);
    }
};

module.exports = PeminjamanBarang;
