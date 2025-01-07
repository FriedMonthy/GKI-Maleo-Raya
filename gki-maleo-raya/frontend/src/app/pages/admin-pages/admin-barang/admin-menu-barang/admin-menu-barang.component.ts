import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Mengimpor CommonModule untuk komponen standalone
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-menu-barang',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-menu-barang.component.html',
  styleUrls: ['./admin-menu-barang.component.css']
})

export class AdminMenuBarangComponent {
  
}
