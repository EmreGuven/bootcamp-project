import { ToastrService } from 'ngx-toastr';
import { IEmployeeAddModel } from './../../../models/request/employee/employee-add-model';
import { EmployeeService } from './../../../services/employee.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
    this.createEmployeeAddForm();
  }

  createEmployeeAddForm() {
    this.employeeAddForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
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
