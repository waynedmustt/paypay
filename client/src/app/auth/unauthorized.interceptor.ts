import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class UnAuthorizedInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
    .pipe(
      tap(
        event => {},
        error => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            if (request.url === `${environment.apiUrl}/api/auth/login` && request.method === 'POST') {
              return;
            }
            this.auth.logout();
          }
        }
      )
    );
  }
}
