import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  welcomeSubscription: Subscription[] = [];
  baseUrl = '';
  user: any;
  isLoadingUser = false;

  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = environment.apiUrl;
  }

  ngOnInit() {
    this.isLoadingUser = true;
    const meSubscription = this.http.get(`${this.baseUrl}/me`)
    .pipe(
      catchError(err => {
        this.isLoadingUser = false;
        return of({
          success: false,
          message: err
        });
      })
    ).subscribe((response: any) => {
      this.isLoadingUser = false;
      if (!response || response.success === false) {
        return of({
          success: false,
          message: 'error occurred'
        });
      }

      this.user = response;
    });

    this.welcomeSubscription.push(meSubscription);
  }

  ngOnDestroy() {
    this.welcomeSubscription.forEach(welcome => welcome.unsubscribe());
  }

}
