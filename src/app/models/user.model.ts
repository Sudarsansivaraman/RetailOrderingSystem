// User model matching backend User entity
export interface User {
  userId: number;
  fullName: string;
  email: string;
  role: string;
}

// Request body for registration
export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

// Request body for login
export interface LoginRequest {
  email: string;
  password: string;
}

// Response from login API
export interface AuthResponse {
  token: string;
  role: string;
  fullName: string;
}
