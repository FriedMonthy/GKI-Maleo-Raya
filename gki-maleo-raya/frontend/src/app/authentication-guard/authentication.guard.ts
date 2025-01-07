import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {

    const user = sessionStorage.getItem('user');

    if (user) {
      
      const parsedUser = JSON.parse(user);
      
      if (parsedUser.role === 'admin') {
        // Jika user role-nya admin, bisa akses halaman admin
        return true;
      }
      
      else if (parsedUser.role === 'jemaat') {
        // Jika user role-nya jemaat, bisa akses halaman jemaat
        return true;
      }
      
      else {
        // Redirect jika role tidak sesuai
        this.router.navigate(['/']);
        return false;
      }
      
    }
    
    else {

      // Redirect ke halaman login sesuai dengan halaman role yang diakses jika belum login
      const currentUrl = this.router.url; // Mendapatkan URL saat ini

      if (currentUrl.includes('admin')) {
        // Jika mencoba mengakses halaman admin saat sebelum login sebagai admin, redirect ke admin-login
        this.router.navigate(['/admin-login']);
      }

      else if (currentUrl.includes('jemaat')) {
        // Jika mencoba mengakses halaman jemaat saat sebelum login sebagai jemaat, redirect ke jemaat-login
        this.router.navigate(['/jemaat-login']);
      }
      
      else {
        this.router.navigate(['/']);
      }

      return false;
      
    }
  }
}
