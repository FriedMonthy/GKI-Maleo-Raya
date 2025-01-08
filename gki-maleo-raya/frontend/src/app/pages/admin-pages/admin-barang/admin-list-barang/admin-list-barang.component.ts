import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-list-barang',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-list-barang.component.html',
  styleUrls: ['./admin-list-barang.component.css'],
})

export class AdminListBarangComponent implements OnInit {
  barangData: any[] = [];
  filteredData: any[] = [];
  searchQuery: string = '';
  showTambahModal: boolean = false;  // Flag untuk modal tambah barang
  showEditModal: boolean = false; // Flag untuk modal edit barang
  showDeleteConfirmModal: boolean = false;  // Flag untuk modal konfirmasi hapus data barang
  itemToDelete: any = null; // Untuk menyimpan item data barang yang akan dihapus

  newBarang: any = {
    id_barang: '',
    nama_barang: '',
    jenis_barang: '',
    kuantitas_barang: 0,
    kondisi_barang: '',
    status_barang: 'Tersedia'
  };

  editBarang: any = {  // Data barang yang akan diedit
    id_barang: '',
    nama_barang: '',
    jenis_barang: '',
    kuantitas_barang: 0,
    kondisi_barang: '',
    status_barang: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchBarangData();
  }

  fetchBarangData() {
    this.http.get<any[]>('http://localhost:3000/api/barang-inventaris')
      .subscribe((data) => {
        this.barangData = data;
        this.filteredData = data;
      });
  }

  searchDataBarang(query: string) {
    this.filteredData = this.barangData.filter(item => 
      item.nama_barang.toLowerCase().includes(query.toLowerCase())
    );
  }

  clearSearch() {
    this.searchQuery = '';
    this.filteredData = this.barangData;
  }

  // Fungsi untuk sorting tabel berdasarkan kolom
  sortTable(field: string) {
    this.filteredData = [...this.filteredData].sort((a, b) => {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });
  }

  editItem(item: any) {
    // Set the data for editing
    this.editBarang = { ...item };
    this.showEditModal = true; // Show edit modal
  }

  deleteItem(item: any) {
    this.itemToDelete = item;  // Simpan item yang ingin dihapus
    this.showDeleteConfirmModal = true;  // Tampilkan modal konfirmasi hapus
  }

  confirmDelete() {
    if (this.itemToDelete) {
      this.http.delete(`http://localhost:3000/api/barang-inventaris/${this.itemToDelete.id_barang}`)
        .subscribe(() => {
          this.fetchBarangData(); // Reload data setelah menghapus data
          this.showDeleteConfirmModal = false; // Otomatis menutup konfirmasi modal
        });
    }
  }

  cancelDelete() {
    this.showDeleteConfirmModal = false; // Otomatis menutup konfirmasi modal
    this.itemToDelete = null; // Clear item yang tidak jadi di hapus
  }

  // Toggle modal untuk tambah barang
  toggleTambahModal() {
    this.showTambahModal = !this.showTambahModal;
    console.log('Toggle Tambah Modal:', this.showTambahModal);

  }

  // Toggle modal untuk edit barang
  toggleEditModal() {
    this.showEditModal = !this.showEditModal;
    console.log('Toggle Edit Modal:', this.showEditModal);

  }

  // Fungsi tambah barang
  tambahBarang() {
    this.http.post('http://localhost:3000/api/barang-inventaris', this.newBarang)
      .subscribe(() => {
        this.fetchBarangData();
        this.toggleTambahModal(); // Tutup modal setelah ditambah
        this.newBarang = {  // Reset form
          id_barang: '',
          nama_barang: '',
          jenis_barang: '',
          kuantitas_barang: 0,
          kondisi_barang: '',
          status_barang: ''
        };
      });
  }

  // Fungsi update barang
  updateBarang() {
    this.http.put(`http://localhost:3000/api/barang-inventaris/${this.editBarang.id_barang}`, this.editBarang)
      .subscribe(() => {
        this.fetchBarangData();
        this.toggleEditModal(); // Tutup modal setelah update
      });
  }
}
