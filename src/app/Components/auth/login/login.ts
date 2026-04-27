import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LoginRequest } from '../../../models/user.model';

// Login component for user authentication
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  // Form fields
  email = '';
  password = '';

  // Error message to display
  errorMessage = '';

  // Loading state
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Handle login form submission
  onLogin(): void {
    // Reset error
    this.errorMessage = '';
    this.isLoading = true;

    // Build login request
    const request: LoginRequest = {
      email: this.email,
      password: this.password
    };

    // Call login API
    this.authService.login(request).subscribe({
      next: (response) => {
        // Save token and user info
        this.authService.saveAuth(response);
        this.isLoading = false;

        // Redirect based on role
        if (response.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/menu']);
        }
      },
      error: (err) => {
        // Show error message
        this.errorMessage = err.error?.message || 'Login failed. Please try again.';
        this.isLoading = false;
      }
    });
  }
}
