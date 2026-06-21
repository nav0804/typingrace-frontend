import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private stompClient: Client | null = null;
  private connectionStatus$: Subject<boolean> = new Subject<boolean>();

  private onlineCountSubject = new BehaviorSubject<number>(0);
  public onlineCount$ = this.onlineCountSubject.asObservable();

  connect(token: string): void {
    // PREVENT DOUBLE CONNECTIONS:
    // If the client is already active, do not attempt to connect again.
    if (this.stompClient && this.stompClient.active) {
      console.log(
        'WebSocket is already active. Skipping duplicate connection request.'
      );
      return;
    }

    const socket = new SockJS('http://localhost:8080/ws-race');

    this.stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      heartbeatIncoming: 0,
      heartbeatOutgoing: 0,
      debug: (msg: string) => console.log(msg),
      reconnectDelay: 5000,
    });

    this.stompClient.onConnect = () => {
      this.connectionStatus$.next(true);
      console.log('WS Connected');

      // Safely subscribe
      this.stompClient?.subscribe('/topic/presence', (message: Message) => {
        const count = parseInt(message.body, 10);
        console.log('Received new count from Kafka/STOMP:', count);
        this.onlineCountSubject.next(count);
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('STOMP Error:', frame);
      this.connectionStatus$.next(false);
    };

    this.stompClient.onWebSocketClose = () => {
      console.log('WebSocket connection was closed.');
    };

    this.stompClient.activate();
  }

  disconnect(): void {
    if (this.stompClient && this.stompClient.active) {
      this.stompClient.deactivate();
      this.stompClient = null; // Clear the instance
      this.connectionStatus$.next(false);
    }
  }
}
