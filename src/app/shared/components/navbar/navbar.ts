import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
  standalone: true, 
  imports: [RouterModule, CommonModule],
})
export class NavbarComponent {
  constructor(public router: Router) {}
}
