import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AdminPageGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any {
    const userLoggedIn = this.authService.getObjectItem('userLoggedIn');
    if (userLoggedIn && userLoggedIn.role && userLoggedIn.role.type !== 'admin') {
      this.router.navigate(['/welcome']);
      return false;
    }

    return true;
  }
}
