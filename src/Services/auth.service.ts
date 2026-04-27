import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterRequest, LoginRequest, AuthResponse } from '../models/user.model';

// Service for handling authentication API calls
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Base URL for auth API
  private apiUrl = 'https://localhost:7174/api/auth';

  constructor(private http: HttpClient) {}

  // Register a new user
  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // Login and get JWT token
  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data);
  }

  // Save token and user info to localStorage
  saveAuth(response: AuthResponse): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('role', response.role);
    localStorage.setItem('fullName', response.fullName);
  }

  // Get the stored JWT token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Get the stored user role
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // Get the stored user name
  getFullName(): string | null {
    return localStorage.getItem('fullName');
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Check if user is an admin
  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  // Logout — clear all stored data
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('fullName');
  }
}
