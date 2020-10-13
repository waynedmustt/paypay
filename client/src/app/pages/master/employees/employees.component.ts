import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Employee } from './employee.interface';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, OnDestroy {
  validateForm: FormGroup;
  private employeesSubscription: Subscription[] = [];
  fb: any;
  http: HttpClient;
  router: Router;
  type: string;
  userId: string;
  baseUrl: string;
  employeeRole: any;
  isLoadingData: boolean;

  constructor(
    httpInstance: HttpClient,
    routerInstance: Router,
    fbInstance: FormBuilder
  ) {
    this.fb = fbInstance;
    this.http = httpInstance;
    this.router = routerInstance;
    this.baseUrl = environment.apiUrl;
  }

  ngOnInit(): void {
    this.getRoles();
    this.validateForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
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
      this.updateEmployee(this.validateForm.value);
    }
  }

  getRoles() {
    const employeeSubscription = this.http.get(
      `${this.baseUrl}/roles`
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
      const employeeRole = response.find((employee) => employee.type === 'employee');
      this.employeeRole = employeeRole;
    });

    this.employeesSubscription.push(employeeSubscription);
    return;
  }

  updateEmployee(employee: Employee) {
    const payload = {
      firstName: employee.firstName,
      lastName: employee.lastName,
      username: employee.username,
      password: employee.password,
      isActive: true,
      role: {
        id: this.employeeRole && this.employeeRole.id
      }
    };

    if (this.userId) {
      delete payload.password;
      delete payload.isActive;
      delete payload.role;
    }

    const url = this.userId ? `${this.baseUrl}/users/${this.userId}` : `${this.baseUrl}/users`;
    const employeeSubscription = this.getEmployeeHttpRequestInstance(
      this.userId,
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
      this.router.navigate(['/master/employees']);
    });

    this.employeesSubscription.push(employeeSubscription);
    return;
  }

  getEmployeeHttpRequestInstance(isUpdate, url, body) {
    if (!isUpdate) {
      return this.http.post(url, body);
    }

    return this.http.put(url, body);
  }

  ngOnDestroy() {
    this.employeesSubscription.forEach(employeeSub => employeeSub.unsubscribe());
  }

}
