import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPageGuard } from './auth/admin-page.guard';
import { AuthGuard } from './auth/auth.guard';
import { LoginGuard } from './auth/login.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'master',
    children: [
      {path: 'employees', loadChildren: () => import('./pages/master/employees/employees.module').then(m => m.EmployeesModule),
      canActivate: [AuthGuard, AdminPageGuard]
      },
      {path: 'performance-reviews', loadChildren: () => import(
        './pages/master/performance-reviews/performance-reviews.module'
      ).then(m => m.PerformanceReviewsModule),
      canActivate: [AuthGuard]
      },
    ],
  },
  {
    path: 'auth',
    children: [
      {path: 'login', component: LoginComponent, canActivate: [LoginGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
