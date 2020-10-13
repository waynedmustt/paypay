import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, OnDestroy {
  private performanceReviewSubscription: Subscription[] = [];
  baseUrl: string;
  id: string;
  isLoadingData = false;
  performanceReview: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.baseUrl = environment.apiUrl;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.getPerformanceReview(this.id);
    });
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
    });

    this.performanceReviewSubscription.push(performanceReviewSub);
  }

  getDate(date) {
    return new Date(date).toDateString();
  }

  ngOnDestroy() {
    this.performanceReviewSubscription.forEach(performanceReviewSub => performanceReviewSub.unsubscribe());
  }

}
