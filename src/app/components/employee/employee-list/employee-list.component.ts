import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from './../../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { IEmployeeGetAllModel } from 'src/app/models/response/employee/employee-getall-model';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: IEmployeeGetAllModel[] = [];

  constructor(
    private employeeService: EmployeeService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
    });
  }

  deleteToEmployee(id: number) {
    this.employeeService.deleteToEmployee(id).subscribe(() => {
      this.toastrService.success('Silme İşlemi Gerçekleşti', 'Tebrikler (:');
      window.location.reload();
    });
  }
}
