import { ToastrService } from 'ngx-toastr';
import { IEmployeeAddModel } from './../../../models/request/employee/employee-add-model';
import { EmployeeService } from './../../../services/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css'],
})
export class EmployeeAddComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private toastrService: ToastrService
  ) {}

  employeeAddForm: FormGroup;
  
  ngOnInit(): void {
    this.createEmployeeForm();
  }

  createEmployeeForm() {
    this.employeeAddForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      nationalIdentity: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      position: ['', Validators.required],
    });
  }
  addToEmployee() {
    if (this.employeeAddForm.valid) {
      let employee = Object.assign({}, this.employeeAddForm.value);
      this.employeeService.addToEmployee(employee).subscribe((data) => {
        this.clearForm();
        this.toastrService.success('Çalışan Eklendi', 'Tebrikler (:');
      });
    } else {
      this.toastrService.error('Eksik Bilgi', '!!!');
    }
  }
  clearForm() {
    this.employeeAddForm.reset();
  }
}
