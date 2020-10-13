import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceReviewsComponent } from './performance-reviews.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerformanceReviewsRoutingModule } from './performance-reviews-routing.module';
import { ViewComponent } from './view/view.component';
import { SubmitComponent } from './submit/submit.component';
import { AssignComponent } from './assign/assign.component';
import { AdminPageGuard } from '../../../auth/admin-page.guard';
import { EmployeePageGuard } from '../../../auth/employee-page.guard';
import { AuthModule } from 'src/app/auth/auth.module';

@NgModule({
  declarations: [
    PerformanceReviewsComponent,
    ListComponent,
    CreateComponent,
    UpdateComponent,
    ViewComponent,
    SubmitComponent,
    AssignComponent
  ],
  imports: [
    AuthModule,
    PerformanceReviewsRoutingModule,
    CommonModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    PerformanceReviewsComponent
  ],
  providers: [AdminPageGuard, EmployeePageGuard]
})
export class PerformanceReviewsModule { }
