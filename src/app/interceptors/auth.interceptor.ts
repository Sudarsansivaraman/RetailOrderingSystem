import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

// Interceptor to attach JWT token to all outgoing HTTP requests
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Get the auth service
  const authService = inject(AuthService);

  // Get the token from localStorage
  const token = authService.getToken();

  // If token exists, clone request and add Authorization header
  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);
  }

  // If no token, pass request as-is
  return next(req);
};
