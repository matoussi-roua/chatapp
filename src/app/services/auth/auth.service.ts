import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoginCredential} from "../../models/auth/login-credential";
import {LoginResponse} from "../../models/auth/login-response";
import {RegisterCredential} from "../../models/auth/register-credential";
import {RegisterResponse} from "../../models/auth/register-response";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8081/api/v1/auth'; // Update if needed

  constructor(private http: HttpClient) {}

  // 🔹 Login Request
  login(credentials: LoginCredential): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials);
  }

  // 🔹 Register Request
  register(credentials: RegisterCredential): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/register`, credentials);
  }

  // 🔹 Logout Request
  logout(): Observable<void> {
    return this.http.get<void>(`${this.baseUrl}/logout`);
  }

  // 🔹 Refresh Token Request
  refreshToken(expiredToken: string, refreshToken: string): Observable<{ accessToken: string }> {
    return this.http.get<{ accessToken: string }>(`${this.baseUrl}/refresh/${refreshToken}`, {
      params: { expiredToken },
    });
  }
}
