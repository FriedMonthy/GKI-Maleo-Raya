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
  newBarang: any = {
    id_barang: '',
    nama_barang: '',
    jenis_barang: '',
    kuantitas_barang: 0,
    kondisi_barang: '',
    status_barang: ''
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
    this.http.delete(`http://localhost:3000/api/barang-inventaris/${item.id_barang}`)
      .subscribe(() => {
        this.barangData = this.barangData.filter(b => b.id_barang !== item.id_barang);
        this.filteredData = [...this.barangData];
      });
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
