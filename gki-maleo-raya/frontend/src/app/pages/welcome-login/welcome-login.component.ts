import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-login',
  standalone: true,
  imports: [],
  templateUrl: './welcome-login.component.html',
  styleUrl: './welcome-login.component.css'
})

export class WelcomeLoginComponent {

  constructor(private router: Router) {}

  // Fungsi untuk menangani klik tombol dan melakukan redirect
  onClick(route: string) {
    this.router.navigate([route]); // Mengarahkan ke route yang diinginkan
  }

}
