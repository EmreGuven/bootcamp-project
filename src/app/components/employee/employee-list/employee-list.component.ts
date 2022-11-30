import { EmployeeService } from './../../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { IEmployeeModelRequest } from 'src/app/models/request/employee-model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  
  employees: IEmployeeModelRequest[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
    });
  }
}
