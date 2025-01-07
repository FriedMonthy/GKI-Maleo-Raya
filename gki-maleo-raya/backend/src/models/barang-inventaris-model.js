const koneksi = require('../database-config/database');

// Fungsi Model Barang Inventaris
const BarangInventaris = {
    getAll: async () => {
        const query = 'SELECT * FROM barang_inventaris';
        const rows = await koneksi.query(query);  // Menggunakan query yang sudah dipromisifikasi
        return rows;
    },

    getById: async (id_barang) => {
        const query = 'SELECT * FROM barang_inventaris WHERE id_barang = ?';
        const rows = await koneksi.query(query, [id_barang]);
        return rows[0];
    },

    create: async (data) => {
        const query = `
            INSERT INTO barang_inventaris 
            (id_barang, nama_barang, jenis_barang, kuantitas_barang, kondisi_barang, status_barang) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const result = await koneksi.query(query, [
            data.id_barang,
            data.nama_barang,
            data.jenis_barang,
            data.kuantitas_barang,
            data.kondisi_barang,
            data.status_barang,
        ]);
        return result.insertId;
    },

    update: async (id_barang, data) => {
        const query = `
            UPDATE barang_inventaris 
            SET nama_barang = ?, jenis_barang = ?, kuantitas_barang = ?, kondisi_barang = ?, status_barang = ? 
            WHERE id_barang = ?
        `;
        await koneksi.query(query, [
            data.nama_barang,
            data.jenis_barang,
            data.kuantitas_barang,
            data.kondisi_barang,
            data.status_barang,
            id_barang,
        ]);
    },

    delete: async (id_barang) => {
        const query = 'DELETE FROM barang_inventaris WHERE id_barang = ?';
        await koneksi.query(query, [id_barang]);
    },
};

module.exports = BarangInventaris;
