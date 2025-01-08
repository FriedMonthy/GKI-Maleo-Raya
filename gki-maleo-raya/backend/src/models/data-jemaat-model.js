const koneksi = require('../database-config/database');

// Fungsi Model Jemaat
const DataJemaat = {
    getAll: async () => {
        const query = `
            SELECT id_jemaat, id_kk_jemaat, id_group_wilayah, nama_jemaat, 
                   tempat_tanggal_lahir, nomor_hp, alamat_domisili, status 
            FROM jemaat
        `;
        return await koneksi.query(query);
    },

    getById: async (id_jemaat) => {
        const query = `
            SELECT id_jemaat, id_kk_jemaat, id_group_wilayah, nama_jemaat, 
                   tempat_tanggal_lahir, nomor_hp, alamat_domisili, status 
            FROM jemaat WHERE id_jemaat = ?
        `;
        const rows = await koneksi.query(query, [id_jemaat]);
        return rows[0];
    },

    create: async (data) => {
        const query = `
            INSERT INTO jemaat (id_jemaat, id_kk_jemaat, id_group_wilayah, nama_jemaat, 
                                tempat_tanggal_lahir, nomor_hp, alamat_domisili, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        return await koneksi.query(query, [
            data.id_jemaat,
            data.id_kk_jemaat,
            data.id_group_wilayah,
            data.nama_jemaat,
            data.tempat_tanggal_lahir,
            data.nomor_hp,
            data.alamat_domisili,
            data.status
        ]);
    },

    update: async (id_jemaat, data) => {
        const query = `
            UPDATE jemaat SET 
                id_kk_jemaat = ?, id_group_wilayah = ?, nama_jemaat = ?, 
                tempat_tanggal_lahir = ?, nomor_hp = ?, alamat_domisili = ?, status = ? 
            WHERE id_jemaat = ?
        `;
        
        return await koneksi.query(query, [
            data.id_kk_jemaat,
            data.id_group_wilayah,
            data.nama_jemaat,
            data.tempat_tanggal_lahir,
            data.nomor_hp,
            data.alamat_domisili,
            data.status,
            id_jemaat
        ]);
    },

    delete: async (id_jemaat) => {
        const query = 'DELETE FROM jemaat WHERE id_jemaat = ?';
        return await koneksi.query(query, [id_jemaat]);
    }
};

module.exports = DataJemaat;
