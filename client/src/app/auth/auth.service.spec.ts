import { HttpClient, HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      HttpClientModule,
    ],
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  it('login successfully', inject([AuthService, HttpClient], (auth: AuthService, http: HttpClient) => {
    spyOn(http, 'post').and.returnValue(of({
      user: {
        name: 'dimas'
      },
      accessToken: '123456'
    }));
    auth.login({
      userName: 'dimas',
      password: '123'
    });
    expect(auth.getObjectItem('userLoggedIn').name).toBe('dimas');
  }));
});
