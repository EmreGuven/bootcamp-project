import { IEmployeeGetAllModel } from './../../../models/response/employee/employee-getall-model';
import { EmployeeService } from './../../../services/employee.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees:IEmployeeGetAllModel[]=[]

  constructor(private employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(){
    this.employeeService.getEmployees().subscribe((data)=>{
      this.employees = data
    })
  }

}
