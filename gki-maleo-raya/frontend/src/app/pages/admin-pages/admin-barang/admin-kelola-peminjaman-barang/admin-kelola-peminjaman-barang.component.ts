import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-kelola-peminjaman-barang',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-kelola-peminjaman-barang.component.html',
  styleUrls: ['./admin-kelola-peminjaman-barang.component.css']
})

export class AdminKelolaPeminjamanBarangComponent implements OnInit {
  peminjamanBarangData: any[] = [];
  filteredData: any[] = [];
  searchQuery: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getDataPeminjamanBarang();
  }

  // Fungsi untuk memformat tanggal menjadi yyyy-MM-dd
  formatDate(date: string | Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getDataPeminjamanBarang() {
    this.http.get<any[]>('http://localhost:3000/api/peminjaman-barang')
      .subscribe((response) => {
        this.peminjamanBarangData = response;

        // Format tanggal sebelum disimpan di filteredData
        this.filteredData = response.map(item => ({
          ...item,
          tanggal_peminjaman: this.formatDate(item.tanggal_peminjaman),
          tanggal_pengembalian: this.formatDate(item.tanggal_pengembalian)
        }));
      }, (error) => {
        console.error('Error fetching data', error);
      });
  }

  // Fungsi untuk sorting tabel berdasarkan kolom
  sortTable(field: string) {
    this.filteredData = [...this.filteredData].sort((a, b) => {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });
  }

  // Fungsi untuk mencari data berdasarkan input pengguna
  searchDataBarang(query: string) {
    this.filteredData = this.peminjamanBarangData.filter(item =>
      item.nama_peminjam.toLowerCase().includes(query.toLowerCase()) ||
      item.nama_barang.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Fungsi untuk membersihkan pencarian dan menampilkan semua data
  clearSearch() {
    this.searchQuery = '';
    this.filteredData = this.peminjamanBarangData;
  }

  // Fungsi untuk Setujui Verifikasi
  setujuiPeminjaman(itemId: number) {
    this.http.patch(`http://localhost:3000/api/peminjaman-barang/${itemId}`, { status_verifikasi: 'Disetujui', status_peminjaman: 'Dipinjam' })
      .subscribe(() => {
        this.getDataPeminjamanBarang();  // Mengambil ulang data setelah perubahan
      });
  }

  // Fungsi untuk Tolak Verifikasi
  tolakPeminjaman(itemId: number) {
    this.http.patch(`http://localhost:3000/api/peminjaman-barang/${itemId}`, { status_verifikasi: 'Ditolak' })
      .subscribe(() => {
        this.getDataPeminjamanBarang();  // Mengambil ulang data setelah perubahan
      });
  }

  // Fungsi untuk Selesai Peminjaman
  selesaiPeminjaman(itemId: number) {
    this.http.patch(`http://localhost:3000/api/peminjaman-barang/${itemId}`, { status_peminjaman: 'Selesai' })
      .subscribe(() => {
        this.getDataPeminjamanBarang();  // Mengambil ulang data setelah perubahan
      });
  }

  // Fungsi untuk menghapus peminjaman
  hapusPeminjaman(itemId: number) {
    this.http.delete(`http://localhost:3000/api/peminjaman-barang/${itemId}`)
      .subscribe(() => {
        this.getDataPeminjamanBarang();  // Mengambil ulang data setelah penghapusan
      });
  }

  // Fungsi untuk memeriksa status peminjaman jika sudah terlambat
  periksaStatusTerlambat() {
    const today = new Date();
    this.filteredData.forEach(item => {
      const tanggalKembali = new Date(item.tanggal_pengembalian);
      if (tanggalKembali < today && item.status_peminjaman !== 'Selesai') {
        this.http.patch(`http://localhost:3000/api/peminjaman-barang/${item.id_peminjaman}`, { status_peminjaman: 'Terlambat' })
          .subscribe(() => {
            this.getDataPeminjamanBarang();  // Mengambil ulang data setelah perubahan
          });
      }
    });
  }
}
