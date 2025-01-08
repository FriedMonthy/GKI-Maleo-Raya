import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Mengimpor CommonModule untuk komponen standalone
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-jemaat-menu-peminjaman-barang',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './jemaat-menu-peminjaman-barang.component.html',
  styleUrl: './jemaat-menu-peminjaman-barang.component.css'
})
export class JemaatMenuPeminjamanBarangComponent {

}
