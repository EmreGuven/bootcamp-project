import { ApplicationListComponent } from './components/application/application-list/application-list.component';
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
import { BlackListListComponent } from './components/black-list/black-list-list/black-list-list.component';
import { InstructorAddComponent } from './components/instructor/instructor-add/instructor-add.component';
import { InstructorUpdateComponent } from './components/instructor/instructor-update/instructor-update.component';
import { ApplicantUpdateComponent } from './components/applicant/applicant-update/applicant-update.component';
import { ApplicantAddComponent } from './components/applicant/applicant-add/applicant-add.component';
import { BootcampAddComponent } from './components/bootcamp/bootcamp-add/bootcamp-add.component';
import { BlackListAddComponent } from './components/black-list/black-list-add/black-list-add.component';
import { ApplicationAddComponent } from './components/application/application-add/application-add.component';
import { ApplicationUpdateComponent } from './components/application/application-update/application-update.component';
import { BlackListUpdateComponent } from './components/black-list/black-list-update/black-list-update.component';
import { BootcampUpdateComponent } from './components/bootcamp/bootcamp-update/bootcamp-update.component';

const routes: Routes = [

  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  { path: 'admin', component: AdminPanelComponent, canActivate: [LoginGuard] },

  { path: 'admin/employees', component: EmployeeListComponent, canActivate: [LoginGuard] },
  { path: 'admin/employees/add', component: EmployeeAddComponent },
  { path: 'admin/employees/update/:id', component: EmployeeUpdateComponent },

  { path: 'admin/instructors', component: InstructorListComponent, canActivate: [LoginGuard] },
  { path: 'admin/instructors/add', component: InstructorAddComponent, canActivate: [LoginGuard] },
  { path: 'admin/instructors/update/:id', component: InstructorUpdateComponent, canActivate: [LoginGuard] },

  { path: 'admin/applicants', component: ApplicantListComponent, canActivate: [LoginGuard] },
  { path: 'admin/applicants/add', component: ApplicantAddComponent, canActivate: [LoginGuard] },
  { path: 'admin/applicants/update/:id', component: ApplicantUpdateComponent, canActivate: [LoginGuard] },

  { path: 'admin/bootcamps', component: BootcampListComponent, canActivate: [LoginGuard] },
  { path: 'admin/bootcamps/add', component: BootcampAddComponent, canActivate: [LoginGuard] },
  { path: 'admin/bootcamps/update/:id', component: BootcampUpdateComponent, canActivate: [LoginGuard] },

  { path: 'admin/blacklists', component: BlackListListComponent, canActivate: [LoginGuard] },
  { path: 'admin/blacklists/add', component: BlackListAddComponent, canActivate: [LoginGuard] },
  { path: 'admin/blacklists/update/:id', component: BlackListUpdateComponent, canActivate: [LoginGuard] },

  { path: 'admin/applications', component: ApplicationListComponent, canActivate: [LoginGuard] },
  { path: 'admin/applications/add', component: ApplicationAddComponent, canActivate: [LoginGuard] },
  { path: 'admin/applications/update/:id', component: ApplicationUpdateComponent, canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
