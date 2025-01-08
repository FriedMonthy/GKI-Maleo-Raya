import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jemaat-pinjam-barang',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './jemaat-pinjam-barang.component.html',
  styleUrl: './jemaat-pinjam-barang.component.css'
})

export class JemaatPinjamBarangComponent {

  user: any;

  barangData: any[] = [];
    filteredData: any[] = [];
    searchQuery: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchBarangData();
    
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.peminjamData.nama_peminjam = this.user.namaJemaat; // Default Nama Peminjam
    }
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

  isPinjamModalOpen: boolean = false; // Status modal
  peminjamData: any = {
    nama_peminjam: '',
    nama_barang: '',
    tanggal_peminjaman: '',
    tanggal_pengembalian: ''
  };

  openPinjamModal(item: any) {
    this.isPinjamModalOpen = true;
    this.peminjamData.nama_barang = item.nama_barang;
    
    // Tambahkan nama jemaat yang sedang login sebagai default
    if (this.user) {
      this.peminjamData.nama_peminjam = this.user.namaJemaat;
    }
  }

  closePinjamModal() {
    this.isPinjamModalOpen = false;
    this.peminjamData = {
      nama_peminjam: '',
      nama_barang: '',
      tanggal_peminjaman: '',
      tanggal_pengembalian: ''
    };
  }

  // Fungsi untuk mengirim data peminjaman ke backend
  submitPeminjaman() {
    // Pastikan data lengkap
    if (this.peminjamData.nama_peminjam && this.peminjamData.tanggal_peminjaman && this.peminjamData.tanggal_pengembalian) {
      this.http.post('http://localhost:3000/api/peminjaman-barang', this.peminjamData).subscribe(response => {
        // Berhasil, tutup modal dan beri notifikasi
        alert('Peminjaman berhasil!');
        this.closePinjamModal();
        // Optionally, refresh data barang jika diperlukan
      });
    } else {
      alert('Data peminjaman belum lengkap!');
    }
  }
}