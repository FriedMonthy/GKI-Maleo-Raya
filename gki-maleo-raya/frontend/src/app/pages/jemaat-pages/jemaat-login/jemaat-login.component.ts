import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jemaat-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './jemaat-login.component.html',
  styleUrls: ['./jemaat-login.component.css'],
})

export class JemaatLoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  private apiUrl = 'http://localhost:3000/jemaat/api/jemaat-login'; // URL backend untuk jemaat

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Email dan password wajib diisi!';
      return;
    }

    // Mengirim request ke backend untuk login jemaat
    this.http.post(this.apiUrl, { email: this.email, password: this.password }).subscribe({
      next: (response: any) => {
        sessionStorage.setItem('user', JSON.stringify(response.user)); // Simpan data pengguna di session
        alert(response.message); // Pesan sukses
        this.router.navigate(['/jemaat-home']); // Navigasi ke halaman home jemaat
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'Terjadi kesalahan saat login.';
      }
    });
  }
}
