import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { SubmitComponent } from './submit/submit.component';
import { AssignComponent } from './assign/assign.component';
import { EmployeePageGuard } from '../../../auth/employee-page.guard';
import { AdminPageGuard } from '../../../auth/admin-page.guard';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'create', component: CreateComponent, canActivate: [AdminPageGuard] },
  { path: 'update/:id', component: UpdateComponent, canActivate: [AdminPageGuard] },
  { path: 'detail/:id', component: ViewComponent, canActivate: [AdminPageGuard] },
  { path: 'submit/:id', component: SubmitComponent, canActivate: [EmployeePageGuard] },
  { path: 'assign/:id', component: AssignComponent, canActivate: [AdminPageGuard] }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformanceReviewsRoutingModule { }
