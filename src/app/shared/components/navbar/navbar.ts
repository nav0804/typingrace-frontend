import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { WebsocketService } from '../../../core/services/websocket.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class NavbarComponent {
  isDropdownOpen: boolean = false;
  isMobileMenuOpen: boolean = false; // Added tracking flag for responsive drawer panel

  constructor(
    public router: Router,
    private authService: AuthService,
    public websocketService: WebsocketService
  ) {}

  toggleMobileMenu(event: Event): void {
    event.stopPropagation();
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.isDropdownOpen = false; // Close profile cards if opening the menu routes
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
    this.isMobileMenuOpen = false; // Close mobile navigation if inspecting your profile cards
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  @HostListener('document:click')
  closeMenus(): void {
    this.isDropdownOpen = false;
    this.isMobileMenuOpen = false;
  }

  onLogout(): void {
    this.isDropdownOpen = false;
    this.isMobileMenuOpen = false;
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
