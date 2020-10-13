import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(err => {
        return of({
          success: false,
          response: err,
        });
      }),
      switchMap(response => {
        if (!response) {
          return of({
            success: false,
            response: {},
          });
        }
        return of(response);
      }),
    );
  }
}
