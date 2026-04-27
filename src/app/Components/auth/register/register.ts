import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { RegisterRequest } from '../../../models/user.model';

// Register component for new user signup
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  // Form fields
  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';

  // Error and success messages
  errorMessage = '';
  successMessage = '';

  // Loading state
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Handle registration form submission
  onRegister(): void {
    // Reset messages
    this.errorMessage = '';
    this.successMessage = '';

    // Validate passwords match
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.isLoading = true;

    // Build register request
    const request: RegisterRequest = {
      fullName: this.fullName,
      email: this.email,
      password: this.password
    };

    // Call register API
    this.authService.register(request).subscribe({
      next: () => {
        // Show success and redirect to login
        this.successMessage = 'Registration successful! Redirecting to login...';
        this.isLoading = false;

        // Redirect after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        // Show error message
        this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
        this.isLoading = false;
      }
    });
  }
}
