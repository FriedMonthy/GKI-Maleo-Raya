import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})

export class AdminHomeComponent implements OnInit {
  user: any;

  constructor(private router: Router) {}

  ngOnInit() {

    // Cek apakah pengguna sudah login
    const storedUser = sessionStorage.getItem('user');
    if (!storedUser) {

      // Jika tidak ada, arahkan ke halaman login
      this.router.navigate(['/admin-login']);
    }
    
    else {
      this.user = JSON.parse(storedUser);
    }
  }

  onLogout() {
    sessionStorage.removeItem('user'); // Hapus data user dari session

    // Hapus overlay Bootstrap jika masih ada
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.remove();
    }

    this.router.navigate(['/admin-login']); // Kembali ke halaman login
  }
}
