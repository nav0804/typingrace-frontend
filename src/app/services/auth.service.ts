// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ApiResponse, JwtResponse } from '../model';
import { jwtDecode } from 'jwt-decode';
import { WebsocketService } from '../core/services/websocket.service';
import { Token } from '@angular/compiler';
import { environment } from '../../environments/environments.prod';

export interface ProfileData {
  id: string;
  name: string;
  gender?: string;
  bio?: string;
  rank?: number;
  profileImageUrl?: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export interface CustomJwtPayload {
  userId: string; // Make sure this matches the claim key name your Spring Boot backend uses!
  sub: string; // Usually the username or email
  exp: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private webSocketService: WebsocketService
  ) {}

  register(payload: any): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(
      `${this.baseUrl}auth/register`,
      payload
    );
  }

  login(payload: any): Observable<ApiResponse<JwtResponse>> {
    return this.http
      .post<ApiResponse<JwtResponse>>(`${this.baseUrl}auth/login`, payload)
      .pipe(
        tap((response) => {
          if (!response.error && response.data) {
            // Store the JWT token securely in local storage upon successful login
            localStorage.setItem('token', response.data.token);
            this.webSocketService.connect(response.data.token);
          }
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.webSocketService.disconnect();
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserIdFromToken(): string | null {
    const token = localStorage.getItem('token'); // Or sessionStorage, matching where you save it on login
    if (!token) return null;

    try {
      // Decode the token string to read its metadata claims payload cleanly
      const decoded = jwtDecode<CustomJwtPayload>(token);
      return decoded.userId;
    } catch (error) {
      console.error('Failed to parse active session telemetry token:', error);
      return null;
    }
  }

  getProfileByUserId(userId: string): Observable<ApiResponse<ProfileData>> {
    return this.http.get<ApiResponse<ProfileData>>(
      `${this.baseUrl}/profile/${userId}`
    );
  }
}
