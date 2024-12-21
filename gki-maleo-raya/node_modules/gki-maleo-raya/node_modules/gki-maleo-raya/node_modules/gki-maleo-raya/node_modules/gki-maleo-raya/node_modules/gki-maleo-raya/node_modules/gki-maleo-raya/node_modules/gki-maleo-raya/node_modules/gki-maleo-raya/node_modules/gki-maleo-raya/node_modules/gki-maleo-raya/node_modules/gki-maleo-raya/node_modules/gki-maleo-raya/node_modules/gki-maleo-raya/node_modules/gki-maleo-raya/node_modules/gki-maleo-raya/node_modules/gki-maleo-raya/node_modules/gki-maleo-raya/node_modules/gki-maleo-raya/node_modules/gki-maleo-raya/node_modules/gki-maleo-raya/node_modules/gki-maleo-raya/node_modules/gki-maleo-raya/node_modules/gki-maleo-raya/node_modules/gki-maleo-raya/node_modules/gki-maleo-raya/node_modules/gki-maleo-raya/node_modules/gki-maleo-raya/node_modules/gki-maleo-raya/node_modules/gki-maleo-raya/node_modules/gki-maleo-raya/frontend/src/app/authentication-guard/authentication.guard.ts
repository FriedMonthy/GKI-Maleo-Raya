import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Periksa apakah ada data login di sessionStorage
    const user = sessionStorage.getItem('user');

    if (user) {
      return true; // Pengguna diizinkan mengakses halaman
    } else {
      // Jika belum login, redirect ke halaman login
      this.router.navigate(['/']);
      return false; // Blokir akses ke halaman lain
    }
  }
}
