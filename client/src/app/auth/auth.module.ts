import { NgModule } from '@angular/core';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';
import { AdminPageGuard } from './admin-page.guard';
import { EmployeePageGuard } from './employee-page.guard';


@NgModule({
  providers: [AuthService, AuthGuard, LoginGuard, AdminPageGuard, EmployeePageGuard],
})
export class AuthModule { }
