import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

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
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatTableModule } from '@angular/material/table';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { ToolbarComponent } from './layouts/toolbar/toolbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SettingsComponent } from './layouts/settings/settings.component';
import { HomeComponent } from './components/home/home.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { profileReducer } from './store/reducers/profile-reducer';

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
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ToolbarComponent,
    FooterComponent,
    SettingsComponent,
    HomeComponent,
    AdminHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    StoreModule.forRoot({profileReducer}),
    SweetAlert2Module.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        positionClass:"toast-bottom-right"
      }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }