import { IBootcampGetAllModel } from './../../models/response/bootcamp/bootcamp-getall-model';
import { BootcampService } from './../../services/bootcamp.service';
import { IEmployeeGetAllModel } from './../../models/response/employee/employee-getall-model';
import { EmployeeService } from './../../services/employee.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  constructor(
    private employeeService: EmployeeService,
    private bootcampService: BootcampService
  ) {}
  employees: IEmployeeGetAllModel[] = [];
  bootcamps: IBootcampGetAllModel[] = [];
  ngOnInit(): void {
    this.getEmployees();
    this.getBootcamps();
  }
  getEmployees() {
    this.employeeService
      .getEmployees()
      .subscribe((data) => (this.employees = data));
  }
  getBootcamps() {
    this.bootcampService.getBootcamps().subscribe((data) => {
      this.bootcamps = data;
    });
  }
}
