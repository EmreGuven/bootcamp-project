import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplicantListComponent } from './components/applicant/applicant-list/applicant-list.component';
import { ApplicationListComponent } from './components/application/application-list/application-list.component';
import { BlackListListComponent } from './components/black-list/black-list-list/black-list-list.component';
import { BootcampListComponent } from './components/bootcamp/bootcamp-list/bootcamp-list.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { InstructorListComponent } from './components/instructor/instructor-list/instructor-list.component';
import { ApplicantAddComponent } from './components/applicant/applicant-add/applicant-add.component';
import { ApplicantUpdateComponent } from './components/applicant/applicant-update/applicant-update.component';
import { ApplicationAddComponent } from './components/application/application-add/application-add.component';
import { ApplicationUpdateComponent } from './components/application/application-update/application-update.component';
import { BlackListAddComponent } from './components/black-list/black-list-add/black-list-add.component';
import { BlackListUpdateComponent } from './components/black-list/black-list-update/black-list-update.component';
import { BootcampAddComponent } from './components/bootcamp/bootcamp-add/bootcamp-add.component';
import { BootcampUpdateComponent } from './components/bootcamp/bootcamp-update/bootcamp-update.component';
import { EmployeeAddComponent } from './components/employee/employee-add/employee-add.component';
import { EmployeeUpdateComponent } from './components/employee/employee-update/employee-update.component';
import { InstructorAddComponent } from './components/instructor/instructor-add/instructor-add.component';
import { InstructorUpdateComponent } from './components/instructor/instructor-update/instructor-update.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    ApplicantListComponent,
    ApplicationListComponent,
    BlackListListComponent,
    BootcampListComponent,
    EmployeeListComponent,
    InstructorListComponent,
    ApplicantAddComponent,
    ApplicantUpdateComponent,
    ApplicationAddComponent,
    ApplicationUpdateComponent,
    BlackListAddComponent,
    BlackListUpdateComponent,
    BootcampAddComponent,
    BootcampUpdateComponent,
    EmployeeAddComponent,
    EmployeeUpdateComponent,
    InstructorAddComponent,
    InstructorUpdateComponent,
    AdminPanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }