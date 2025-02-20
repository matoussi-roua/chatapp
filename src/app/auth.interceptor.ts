import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {AuthService} from "./services/auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the access token from localStorage
    const accessToken = localStorage.getItem('accessToken');
    let modifiedReq = req;

    // If access token exists, attach it to the request header
    if (accessToken) {
      modifiedReq = req.clone({
        setHeaders: { Authorization: `Bearer ${accessToken}` },
      });
    }

    return next.handle(modifiedReq).pipe(
      catchError((error) => {
        // If error is a 401 Unauthorized, handle token refresh
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(req, next);
        }
        return throwError(() => error);  // Re-throw the error for other cases
      })
    );
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      // Get refresh token from localStorage
      const refreshToken = localStorage.getItem('refreshToken');
      const expiredToken = localStorage.getItem('accessToken');

      if (refreshToken && expiredToken) {
        // Call the refreshToken method with both the expired and refresh tokens
        return this.authService.refreshToken(expiredToken,refreshToken).pipe(
          switchMap((response) => {
            // Store the new access token
            localStorage.setItem('accessToken', response.accessToken);
            this.isRefreshing = false;

            // Retry the original request with the new access token
            return next.handle(
              req.clone({ setHeaders: { Authorization: `Bearer ${response.accessToken}` } })
            );
          }),
          catchError((refreshError) => {
            // Handle refresh token failure (e.g., logout user if refresh fails)
            this.isRefreshing = false;
            this.authService.logout();
            this.router.navigate(['/login']);
            return throwError(() => refreshError);
          })
        );
      }
    }

    // If refresh is already in progress, logout user and redirect to login
    this.authService.logout();
    this.router.navigate(['/login']);
    return throwError(() => new Error('Unauthorized'));
  }

}
