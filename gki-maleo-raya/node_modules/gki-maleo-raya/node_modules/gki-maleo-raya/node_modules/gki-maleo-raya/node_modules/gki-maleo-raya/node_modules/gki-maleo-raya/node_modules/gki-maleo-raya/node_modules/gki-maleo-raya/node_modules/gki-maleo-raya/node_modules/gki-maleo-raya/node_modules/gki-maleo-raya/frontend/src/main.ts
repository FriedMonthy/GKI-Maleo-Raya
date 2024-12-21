import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/pages/login/login.component';
import { HomeComponent } from './app/pages/home/home.component';
import { AuthGuard } from './app/authentication-guard/authentication.guard'; // Import AuthGuard

const routes: Routes = [
  { path: '', component: LoginComponent }, // Halaman login tidak dilindungi
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }, // Home dilindungi
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes),
      HttpClientModule,
      FormsModule
    ),
  ],
}).catch((err) => console.error(err));
