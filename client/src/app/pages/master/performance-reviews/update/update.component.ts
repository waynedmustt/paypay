import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PerformanceReviewsComponent } from '../performance-reviews.component';

@Component({
  selector: 'app-update',
  templateUrl: '../performance-reviews.component.html',
  styleUrls: ['../performance-reviews.component.css']
})
export class UpdateComponent extends PerformanceReviewsComponent implements OnInit, OnDestroy {
  validateForm: FormGroup;
  id: any;
  private updateSubscription: Subscription[] = [];

  constructor(
    http: HttpClient,
    router: Router,
    fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    super(
      http,
      router,
      fb
    );
    this.validateForm = super.validateForm;
   }

  ngOnInit() {
    super.type = 'Update';
    this.route.params.subscribe(params => {
      this.id = params.id;
      super.performanceReviewId = this.id;

      super.isLoadingData = true;
      super.getUsers();
      const updateSub = this.getPerformanceReview(this.id).subscribe((response: any) => {
        super.date = new Date(response.year);
        this.validateForm = this.fb.group({
          name: [response.name, [Validators.required]],
          userId: [response.user.id, [Validators.required]],
        });
        super.isLoadingData = false;
      });

      this.updateSubscription.push(updateSub);
    });

  }

  getPerformanceReview(id) {
    return this.http.get(`${this.baseUrl}/performance-reviews/${id}`);
  }

  ngOnDestroy() {
    this.updateSubscription.forEach(updateSub => updateSub.unsubscribe());
  }

}
