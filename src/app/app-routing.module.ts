import { EmployeeUpdateComponent } from './components/employee/employee-update/employee-update.component';
import { EmployeeAddComponent } from './components/employee/employee-add/employee-add.component';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BootcampListComponent } from './components/bootcamp/bootcamp-list/bootcamp-list.component';
import { ApplicantListComponent } from './components/applicant/applicant-list/applicant-list.component';
import { InstructorListComponent } from './components/instructor/instructor-list/instructor-list.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'admin', component: AdminPanelComponent, canActivate: [LoginGuard] },
  { path: 'admin/employees', component: EmployeeListComponent, canActivate: [LoginGuard] },
  { path: 'admin/employees/add', component: EmployeeAddComponent },
  { path: 'admin/employees/update/:id', component: EmployeeUpdateComponent },
  { path: 'admin/instructors', component: InstructorListComponent, canActivate: [LoginGuard] },
  { path: 'admin/applicants', component: ApplicantListComponent, canActivate: [LoginGuard] },
  { path: 'admin/bootcamps', component: BootcampListComponent, canActivate: [LoginGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
