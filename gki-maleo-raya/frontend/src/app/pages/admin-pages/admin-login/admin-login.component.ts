import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Pastikan FormsModule diimpor
import { CommonModule } from '@angular/common';  // Impor CommonModule

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Menambahkan CommonModule di sini
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})

export class AdminLoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  private apiUrl = 'http://localhost:3000/admin/api/admin-login'; // URL backend

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Email dan password wajib diisi!';
      return;
    }
  
    // Mengirim request ke backend
    this.http.post(this.apiUrl, { email: this.email, password: this.password }).subscribe({
      next: (response: any) => {
        
        // Cek role, jika admin baru lanjut ke admin home
        if (response.user.role === 'admin') {
          sessionStorage.setItem('user', JSON.stringify(response.user)); // Simpan data pengguna di session
          alert(response.message); // Pesan sukses
          this.router.navigate(['/admin-home']); // Navigasi ke halaman home
        }
        
        else {
          this.errorMessage = 'Hanya admin yang dapat mengakses halaman ini.';
        }

      },

      error: (error) => {
        this.errorMessage = error.error.message || 'Terjadi kesalahan saat login.';
      }

    });
  }
}
