import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private router: Router) {}

  onLogout() {
    sessionStorage.removeItem('user'); // Hapus data user dari session
    this.router.navigate(['/']); // Kembali ke halaman login
  }
}
