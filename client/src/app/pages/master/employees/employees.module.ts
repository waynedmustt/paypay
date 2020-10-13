import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesRoutingModule } from './employees-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { EmployeesComponent } from './employees.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [
    EmployeesComponent,
    ListComponent,
    CreateComponent,
    UpdateComponent,
    ViewComponent
  ],
  imports: [
    EmployeesRoutingModule,
    CommonModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    EmployeesComponent
  ]
})
export class EmployeesModule { }
