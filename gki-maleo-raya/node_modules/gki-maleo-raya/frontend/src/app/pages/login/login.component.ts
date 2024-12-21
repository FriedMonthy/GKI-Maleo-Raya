import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Pastikan FormsModule diimpor
import { CommonModule } from '@angular/common';  // Impor CommonModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Menambahkan CommonModule di sini
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  private apiUrl = 'http://localhost:3000/api/login'; // URL backend

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Email dan password wajib diisi!';
      return;
    }

    // Mengirim request ke backend
    this.http.post(this.apiUrl, { email: this.email, password: this.password }).subscribe({
      next: (response: any) => {
        sessionStorage.setItem('user', JSON.stringify(response.user)); // Simpan data pengguna di session
        alert(response.message); // Pesan sukses
        this.router.navigate(['/home']); // Navigasi ke halaman home
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'Terjadi kesalahan saat login.';
      }
    });
    
  }
}
