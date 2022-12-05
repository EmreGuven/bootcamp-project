import { CanActivate } from '@angular/router';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
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
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [

  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  { path:"",component:HomeComponent},

  { path: 'admin', component: AdminPanelComponent, children:[ 

    { path:"",component:AdminHomeComponent},
    
    { path: 'employees', component: EmployeeListComponent},
    { path: 'employees/add', component: EmployeeAddComponent },
    { path: 'employees/update/:id', component: EmployeeUpdateComponent },

    { path: 'instructors', component: InstructorListComponent },
    { path: 'instructors/add', component: InstructorAddComponent},
    { path: 'instructors/update/:id', component: InstructorUpdateComponent},

    { path: 'applicants', component: ApplicantListComponent},
    { path: 'applicants/add', component: ApplicantAddComponent },
    { path: 'applicants/update/:id', component: ApplicantUpdateComponent },

    { path: 'bootcamps', component: BootcampListComponent },
    { path: 'bootcamps/add', component: BootcampAddComponent},
    { path: 'bootcamps/update/:id', component: BootcampUpdateComponent },

    { path: 'blacklists', component: BlackListListComponent },
    { path: 'blacklists/add', component: BlackListAddComponent },
    { path: 'blacklists/update/:id', component: BlackListUpdateComponent },

    { path: 'applications', component: ApplicationListComponent },
    { path: 'applications/add', component: ApplicationAddComponent },
    { path: 'applications/update/:id', component: ApplicationUpdateComponent },
  ],
  canActivate:[LoginGuard],data:{role:'ROLE_EMPLOYEE'}, 
},
{
  path:'instructor', component:AdminPanelComponent, children:[
    { path:'applicants', component:ApplicantListComponent },
    { path:'bootcamps', component:BootcampListComponent },
    { path:'blacklists', component:BlackListListComponent } 
  ],
  canActivate: [LoginGuard],
  data:{ role: 'ROLE_INSTRUCTOR' }
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
