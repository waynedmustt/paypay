import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeesComponent } from '../employees.component';

@Component({
  selector: 'app-create',
  templateUrl: '../employees.component.html',
  styleUrls: ['../employees.component.css']
})
export class CreateComponent extends EmployeesComponent implements OnInit {
  validateForm: FormGroup;

  constructor(
    http: HttpClient,
    router: Router,
    fb: FormBuilder
  ) {
    super(
      http,
      router,
      fb
    );
    this.validateForm = super.validateForm;
  }

  ngOnInit(): void {
    super.type = 'Create';
    super.ngOnInit();
  }

}
