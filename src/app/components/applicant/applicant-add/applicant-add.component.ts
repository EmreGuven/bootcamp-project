import { ToastrService } from 'ngx-toastr';
import { ApplicantService } from './../../../services/applicant.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applicant-add',
  templateUrl: './applicant-add.component.html',
  styleUrls: ['./applicant-add.component.css'],
})
export class ApplicantAddComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private applicantService: ApplicantService,
    private toastrService: ToastrService
  ) {}

  applicantAddForm: FormGroup;

  ngOnInit(): void {
    this.createApplicantForm();
  }

  createApplicantForm() {
    this.applicantAddForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      nationalIdentity: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      about: ['', Validators.required],
    });
  }

  addToApplicant() {
    if (this.applicantAddForm.valid) {
      let applicant = Object.assign({}, this.applicantAddForm.value);
      this.applicantService.addToApplicant(applicant).subscribe((data) => {
        this.clearForm();
        this.toastrService.success('Aday Eklendi', 'Tebrikler (:');
      });
    } else {
      this.toastrService.error('Eksik Bilgi', '!!!');
    }
  }
  clearForm() {
    this.applicantAddForm.reset();
  }
}
