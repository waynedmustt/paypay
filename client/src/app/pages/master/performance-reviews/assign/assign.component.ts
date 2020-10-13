import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.css']
})
export class AssignComponent implements OnInit, OnDestroy {
  validateForm: FormGroup;
  private performanceReviewsSubscription: Subscription[] = [];
  baseUrl: string;
  id: string;
  isLoadingData = false;
  performanceReview: any;
  users: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.baseUrl = environment.apiUrl;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.getPerformanceReview(this.id);
      this.validateForm = this.fb.group({
        userId: [null, [Validators.required]],
      });
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls[i]) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.validateForm.valid) {
      this.createAssignee(this.validateForm.value);
    }
  }

  getUsers() {
    const performanceReviewsSubscription = this.http.get(
      `${this.baseUrl}/users`
    )
    .pipe(
      catchError(err => {
        this.isLoadingData = false;
        return of({
          success: false,
          message: err
        });
      })
    ).subscribe((response: any) => {
      this.isLoadingData = false;
      if (!response || response.success === false) {
        return of({
          success: false,
          message: 'error occurred'
        });
      }
      const employees = response.filter((user) => user.role.type === 'employee' && user.isActive);
      const userPerformReview = this.performanceReview && this.performanceReview.user;
      const assignees = this.performanceReview && this.performanceReview.assignee;
      if (employees.length === assignees.length || ((employees.length - 1) === assignees.length)) {
        this.users = [];
        return;
      }
      const firstFilter = employees ? employees.filter((employee) => employee.id !== userPerformReview.id) : [];
      let secondFilter = firstFilter;
      if (!assignees) {
        this.users = secondFilter;
        return;
      }

      for (const assignee of assignees) {
        if (!assignee || !assignee.user || !assignee.user.id) {
          continue;
        }

        const userId = assignee.user.id;
        secondFilter = firstFilter.filter((employee) => employee.id !== userId);
      }
      this.users = secondFilter;
    });

    this.performanceReviewsSubscription.push(performanceReviewsSubscription);
  }

  getPerformanceReview(id) {
    this.isLoadingData = true;
    const performanceReviewSub = this.http.get(
      `${this.baseUrl}/performance-reviews/${id}`
    )
    .pipe(
      catchError(err => {
        this.isLoadingData = false;
        return of({
          success: false,
          message: err
        });
      })
    ).subscribe((response: any) => {
      this.isLoadingData = false;
      if (!response || response.success === false) {
        return of({
          success: false,
          message: 'error occurred'
        });
      }
      this.performanceReview = response;
      this.getUsers();
    });

    this.performanceReviewsSubscription.push(performanceReviewSub);
  }

  createAssignee(assignee: any) {
    const payload = {
      isSubmitted: false,
      user: {
        id: assignee && assignee.userId
      },
      performanceReview: {
        id: this.performanceReview.id
      }
    };

    const url = `${this.baseUrl}/assignees`;
    const performanceReviewsSubscription = this.http.post(
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

  ngOnDestroy() {
    this.performanceReviewsSubscription.forEach(performanceReviewSub => performanceReviewSub.unsubscribe());
  }

}
