import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jemaat-home',
  standalone: true,
  templateUrl: './jemaat-home.component.html',
  styleUrls: ['./jemaat-home.component.css'],
})
export class JemaatHomeComponent implements OnInit {
  user: any;

  constructor(private router: Router) {}

  ngOnInit() {

    // Cek apakah pengguna sudah login
    const storedUser = sessionStorage.getItem('user');
    if (!storedUser) {
      // Jika tidak ada, arahkan ke halaman login
      this.router.navigate(['/jemaat-login']);
    }
    
    else {
      this.user = JSON.parse(storedUser);
    }
    
  }

  onLogout() {
    sessionStorage.removeItem('user'); // Hapus data user dari session
    this.router.navigate(['/jemaat-login']); // Kembali ke halaman login jemaat
  }
}
