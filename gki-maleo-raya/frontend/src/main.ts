import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';

// Fungsi Akses Halaman Welcome Login
import { WelcomeLoginComponent } from './app/pages/welcome-login/welcome-login.component';

// Fungsi Akses Halaman Admin
import { AdminLoginComponent } from './app/pages/admin-pages/admin-login/admin-login.component';
import { AdminHomeComponent } from './app/pages/admin-pages/admin-home/admin-home.component';
import { AdminMenuBarangComponent } from './app/pages/admin-pages/admin-barang/admin-menu-barang/admin-menu-barang.component';
import { AdminListBarangComponent } from './app/pages/admin-pages/admin-barang/admin-list-barang/admin-list-barang.component';
import { AdminKelolaPeminjamanBarangComponent } from './app/pages/admin-pages/admin-barang/admin-kelola-peminjaman-barang/admin-kelola-peminjaman-barang.component';


// Fungsi Akses Halaman Jemaat
import { JemaatLoginComponent } from './app/pages/jemaat-pages/jemaat-login/jemaat-login.component';
import { JemaatHomeComponent } from './app/pages/jemaat-pages/jemaat-home/jemaat-home.component';
import { JemaatMenuPeminjamanBarangComponent } from './app/pages/jemaat-pages/jemaat-peminjaman-barang/jemaat-menu-peminjaman-barang/jemaat-menu-peminjaman-barang.component';
import { JemaatPinjamBarangComponent } from './app/pages/jemaat-pages/jemaat-peminjaman-barang/jemaat-pinjam-barang/jemaat-pinjam-barang.component';
import { JemaatHistoryPeminjamanBarangComponent } from './app/pages/jemaat-pages/jemaat-peminjaman-barang/jemaat-history-peminjaman-barang/jemaat-history-peminjaman-barang.component';


import { AuthenticationGuard } from './app/authentication-guard/authentication.guard'; // Import Authentication Guard

const routes: Routes = [
  { path: '', component: WelcomeLoginComponent }, // Rute untuk Welcome Login

  // Path Rute Halaman Login
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'jemaat-login', component: JemaatLoginComponent },

  // Path Rute Halaman Untuk Admin
  { path: 'admin-home', component: AdminHomeComponent, canActivate: [AuthenticationGuard] },
  { path: 'admin-menu-barang', component: AdminMenuBarangComponent, canActivate: [AuthenticationGuard]},
  { path: 'admin-list-barang', component: AdminListBarangComponent, canActivate: [AuthenticationGuard]},
  { path: 'admin-kelola-peminjaman-barang', component: AdminKelolaPeminjamanBarangComponent, canActivate: [AuthenticationGuard]},


  // Path Rute Halaman Untuk Jemaat
  { path: 'jemaat-home', component: JemaatHomeComponent, canActivate: [AuthenticationGuard] },
  { path: 'jemaat-menu-peminjaman-barang', component: JemaatMenuPeminjamanBarangComponent, canActivate: [AuthenticationGuard] },
  { path: 'jemaat-pinjam-barang', component: JemaatPinjamBarangComponent, canActivate: [AuthenticationGuard] },
  { path: 'jemaat-history-peminjaman-barang', component: JemaatHistoryPeminjamanBarangComponent, canActivate: [AuthenticationGuard] },

];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      RouterModule.forRoot(routes),
      FormsModule
    ),
    provideHttpClient(),
  ],
}).catch((err) => console.error(err));
