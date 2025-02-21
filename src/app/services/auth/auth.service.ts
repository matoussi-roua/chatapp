import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoginCredential} from "../../models/auth/login-credential";
import {AuthResponse} from "../../models/auth/auth-response";
import {RegisterCredential} from "../../models/auth/register-credential";
import {GlobalService} from "../global/global.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService extends GlobalService{

  private baseUrl = this.getAuthUrl()+'/auth'; // Update if needed

  constructor(private http: HttpClient) {
    super();
  }

  // 🔹 Login Request
  login(credentials: LoginCredential): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, credentials);
  }

  // 🔹 Register Request
  register(credentials: RegisterCredential): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, credentials);
  }

  // 🔹 Logout Request
  logout(): Observable<void> {
    return this.http.get<void>(`${this.baseUrl}/logout`);
  }
  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    return !!token;  // Return true if token exists, else false
  }
  // 🔹 Refresh Token Request
  refreshToken(expiredToken: string, refreshToken: string): Observable<{ accessToken: string }> {
    return this.http.get<{ accessToken: string }>(`${this.baseUrl}/refresh/${refreshToken}`, {
      params: { expiredToken },
    });
  }
}
