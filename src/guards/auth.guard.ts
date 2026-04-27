import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Guard to protect routes that require authentication
export const authGuard: CanActivateFn = () => {
  // Inject required services
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if user is logged in
  if (authService.isLoggedIn()) {
    return true;
  }

  // Redirect to login if not authenticated
  router.navigate(['/login']);
  return false;
};

// Guard to protect admin-only routes
export const adminGuard: CanActivateFn = () => {
  // Inject required services
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if user is admin
  if (authService.isLoggedIn() && authService.isAdmin()) {
    return true;
  }

  // Redirect to menu if not admin
  router.navigate(['/menu']);
  return false;
};
