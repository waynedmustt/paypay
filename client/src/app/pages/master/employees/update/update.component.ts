import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee } from '../employee.interface';
import { EmployeesComponent } from '../employees.component';

@Component({
  selector: 'app-update',
  templateUrl: '../employees.component.html',
  styleUrls: ['../employees.component.css']
})
export class UpdateComponent extends EmployeesComponent implements OnInit, OnDestroy {
  validateForm: FormGroup;
  id: any;
  private usersSubscription: Subscription[] = [];

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
      super.userId = this.id;

      super.isLoadingData = true;
      const userSubscription = this.getUsers(this.id).subscribe((response: Employee) => {
        this.validateForm = this.fb.group({
          firstName: [response.firstName, [Validators.required]],
          lastName: [response.lastName, [Validators.required]],
          username: [response.username, [Validators.required]],
        });
        super.isLoadingData = false;
      });

      this.usersSubscription.push(userSubscription);
    });
  }

  getUsers(id) {
    return this.http.get(`${this.baseUrl}/users/${id}`);
  }

  ngOnDestroy() {
    this.usersSubscription.forEach(userSub => userSub.unsubscribe());
  }

}
