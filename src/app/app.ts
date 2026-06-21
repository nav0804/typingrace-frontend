import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { WebsocketService } from './core/services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected title = 'typingrace-frontend';

  constructor(
    private authService: AuthService,
    private websocketService: WebsocketService
  ) {}

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      this.websocketService.connect(token);
    }
  }
}
