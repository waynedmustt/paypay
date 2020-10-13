import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private errorMsg = new BehaviorSubject<string>('');
  private authSubscription: Subscription[] = [];
  private baseUrl = '';

  get isLoggedIn() {
    this.loggedIn.next(false);
    if (this.getAccessToken !== null) {
      this.loggedIn.next(true);
    }
    return this.loggedIn.asObservable();
  }

  get getErrorMsg() {
    return this.errorMsg.asObservable();
  }

  get getAccessToken() {
    return localStorage.getItem('accessToken');
  }
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.baseUrl = environment.apiUrl;
  }

  login(user: User) {
    if (user.userName !== '' && user.password !== '') {
      const payload = {
        username: user.userName,
        password: user.password
      };
      const loginSubscription = this.http.post(
        `${this.baseUrl}/auth/login`,
        payload
      )
      .pipe(
        catchError(err => {
          this.errorMsg.next(err.error.message);
          this.loggedIn.next(false);
          return of({
            success: false,
            message: err
          });
        })
      ).subscribe((response: any) => {
        if (!response || response.success === false) {
          this.loggedIn.next(false);
          return of({
            success: false,
            message: 'error occurred'
          });
        }

        localStorage.setItem('accessToken', response.accessToken);
        const { password, ...result } = response.user;
        this.setObjectItem('userLoggedIn', result);
        this.loggedIn.next(true);
        this.router.navigate(['/']);
      });

      this.authSubscription.push(loginSubscription);
      return;
    }

    this.loggedIn.next(false);
  }

  setObjectItem(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  getObjectItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('activeTab');
    localStorage.removeItem('userLoggedIn');
    this.loggedIn.next(false);
    this.errorMsg.next('');
    this.router.navigate(['/auth/login']);
  }

  ngOnDestroy() {
    this.authSubscription.forEach(authSub => authSub.unsubscribe());
  }
}
