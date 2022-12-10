import { IApplicationGetAllModel } from './../../models/response/application/application-getall-model';
import { IApplicantGetAllModel } from 'src/app/models/response/applicant/applicant-getall-model';
import { ApplicationService } from 'src/app/services/application.service';
import { ApplicantService } from 'src/app/services/applicant.service';
import { IInstructorGetAllModel } from './../../models/response/instructor/instructor-getall-model';
import { InstructorService } from 'src/app/services/instructor.service';
import { BootcampService } from './../../services/bootcamp.service';
import { IBootcampGetAllModel } from './../../models/response/bootcamp/bootcamp-getall-model';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { IEmployeeGetAllModel } from 'src/app/models/response/employee/employee-getall-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  bootcamps: IBootcampGetAllModel[] = [];
  instructors: IInstructorGetAllModel[] = [];
  applicants: IApplicantGetAllModel[] = [];
  applications: IApplicationGetAllModel[] = [];
  employees: IEmployeeGetAllModel[] = [];
  constructor(
    private bootcampService: BootcampService,
    private instructorService: InstructorService,
    private applicantService: ApplicantService,
    private applicationService: ApplicationService,
    private employeeService: EmployeeService,
  ) {}

  ngOnInit(): void {
    this.getBootcamps();
    this.getInstructors();
    this.getApplicants();
    this.getApplications();
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
    });
  }

  getBootcamps() {
    this.bootcampService.getBootcamps().subscribe((data) => {
      this.bootcamps = data;
    });
  }
  getInstructors() {
    this.instructorService.getInstructors().subscribe((data) => {
      this.instructors = data;
    });
  }
  getApplicants() {
    this.applicantService.getApplicants().subscribe((data) => {
      this.applicants = data;
    });
  }
  getApplications() {
    this.applicationService.getApplications().subscribe((data) => {
      this.applications = data;
    });
  }
}
