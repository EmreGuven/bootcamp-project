import { IEmployeeGetAllModel } from './../../models/response/employee/employee-getall-model';
import { EmployeeService } from './../../services/employee.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  constructor(private employeeService: EmployeeService) {}
  employees: IEmployeeGetAllModel[] = [];
  ngOnInit(): void {
    this.getEmployees();
  }
  getEmployees() {
    this.employeeService
      .getEmployees()
      .subscribe((data) => (this.employees = data));
  }
}
