import { IEmployeeGetModel } from './../../../models/response/employee/employee-get-model';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from './../../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css'],
})
export class EmployeeUpdateComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private location: Location
  ) {}

  employeeUpdateForm: FormGroup;
  employee: IEmployeeGetModel;

  ngOnInit(): void {
    this.getEmployeeById();
  }
  getEmployeeById() {
    this.activatedRoute.params.subscribe((params) => {
      this.getEmployee(params['id']);
    });
  }
  getEmployee(id: number) {
    this.employeeService.getEmployeById(id).subscribe((data) => {
      this.employee = data;
      this.createEmployeeUpdateForm();
    });
  }

  createEmployeeUpdateForm() {
    this.employeeUpdateForm = this.formBuilder.group({
      firstName: [this.employee.firstName, Validators.required],
      lastName: [this.employee.firstName, Validators.required],
      email: [this.employee.email, Validators.required],
      password: [this.employee.password, Validators.required],
      nationalIdentity: [this.employee.nationalIdentity, Validators.required],
      dateOfBirth: [this.employee.dateOfBirth, Validators.required],
      position: [this.employee.position, Validators.required],
    });
  }

  updateToEmployee() {
    this.employeeService
      .updateToEmployee(
        this.activatedRoute.snapshot.params['id'],
        this.employeeUpdateForm.value
      )
      .subscribe(() => {
        this.toastrService.success(
          'Çalışan Bilgileri Güncellendi',
          'Tebrikler (:'
        );
      });
    this.location.back();
  }
}
