import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})
export class SubmitComponent implements OnInit, OnDestroy {
  validateForm: FormGroup;
  private performanceReviewsSubscription: Subscription[] = [];
  baseUrl: string;
  id: string;
  isLoadingData = false;
  performanceReview: any;
  users: any;
  assignees: any;
  userLoggedIn: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.baseUrl = environment.apiUrl;
  }

  ngOnInit() {
    this.userLoggedIn = this.authService.getObjectItem('userLoggedIn');
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.getPerformanceReview(this.id);
      this.validateForm = this.fb.group({
        feedback: [null, [Validators.required]],
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
      const assignees = response.assignee;
      this.getAssignee(assignees);
    });

    this.performanceReviewsSubscription.push(performanceReviewSub);
  }

  getAssignee(assignees) {
    if (!assignees || (assignees && assignees.length === 0)) {
      return;
    }

    this.assignees = assignees.find(assignee => assignee.user.id === this.userLoggedIn.id);
  }

  createAssignee(assignee: any) {
    const payload = {
      feedback: assignee.feedback,
      isSubmitted: true
    };

    const url = `${this.baseUrl}/assignees/feedback/${this.assignees.id}`;
    const performanceReviewsSubscription = this.http.put(
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
