import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PerformanceReview } from './performance-reviews.interface';

@Component({
  selector: 'app-performance-reviews',
  templateUrl: './performance-reviews.component.html',
  styleUrls: ['./performance-reviews.component.css']
})
export class PerformanceReviewsComponent implements OnInit, OnDestroy {
  validateForm: FormGroup;
  private performanceReviewsSubscription: Subscription[] = [];
  date = null;
  fb: any;
  http: HttpClient;
  router: Router;
  type: string;
  baseUrl: string;
  userLoggedIn$: Observable<any>;
  userLoggedIn: any;
  users: any;
  isLoadingData = false;
  isLoadingUsers = false;
  performanceReviewId: string;

  constructor(
    httpInstance: HttpClient,
    routerInstance: Router,
    fbInstance: FormBuilder
  ) {
    this.http = httpInstance;
    this.router = routerInstance;
    this.fb = fbInstance;
    this.baseUrl = environment.apiUrl;
  }

  ngOnInit(): void {
    this.getUsers();
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      userId: [null, [Validators.required]],
    });
  }

  getUsers() {
    this.isLoadingUsers = true;
    const performanceReviewsSubscription = this.http.get(
      `${this.baseUrl}/users`
    )
    .pipe(
      catchError(err => {
        this.isLoadingUsers = false;
        return of({
          success: false,
          message: err
        });
      })
    ).subscribe((response: any) => {
      this.isLoadingUsers = false;
      if (!response || response.success === false) {
        return of({
          success: false,
          message: 'error occurred'
        });
      }
      const employees = response.filter((user) => user.role.type === 'employee' && user.isActive);
      this.users = employees;
    });

    this.performanceReviewsSubscription.push(performanceReviewsSubscription);
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls[i]) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.validateForm.valid) {
      this.updatePerformanceReview(this.validateForm.value);
    }
  }

  onChange(result: Date): void {
    this.date = result && result.toISOString();
  }

  updatePerformanceReview(performanceReview: PerformanceReview) {
    const payload = {
      name: performanceReview.name,
      year: this.date,
      isCompleted: false,
      user: {
        id: performanceReview.userId
      }
    };

    if (this.performanceReviewId) {
      delete payload.isCompleted;
    }

    const url = this.performanceReviewId ?
    `${this.baseUrl}/performance-reviews/${this.performanceReviewId}` : `${this.baseUrl}/performance-reviews`;
    const performanceReviewsSubscription = this.getEmployeeHttpRequestInstance(
      this.performanceReviewId,
      url,
      payload
    )
    .pipe(
      catchError(err => {
        return of({
          success: false,
          message: err
        });
      })
    ).subscribe((response: any) => {
      if (!response || response.success === false) {
        return of({
          success: false,
          message: 'error occurred'
        });
      }
      this.router.navigate(['/master/performance-reviews']);
    });

    this.performanceReviewsSubscription.push(performanceReviewsSubscription);
  }

  getEmployeeHttpRequestInstance(isUpdate, url, body) {
    if (!isUpdate) {
      return this.http.post(url, body);
    }

    return this.http.put(url, body);
  }

  ngOnDestroy() {
    this.performanceReviewsSubscription.forEach(performanceReviewSub => performanceReviewSub.unsubscribe());
  }

}
