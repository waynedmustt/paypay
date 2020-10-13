import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class EmployeePageGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any {
    const userLoggedIn = this.authService.getObjectItem('userLoggedIn');
    if (userLoggedIn && userLoggedIn.role && userLoggedIn.role.type !== 'employee') {
      this.router.navigate(['/welcome']);
      return false;
    }

    return true;
  }
}
