import { Injectable } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {


  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isAuthenticated = this.authService.isAuthenticated(); // You may need to implement this in AuthService
    if (isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/login']);  // Redirect to login if not authenticated
      return false;
    }
  }
}


