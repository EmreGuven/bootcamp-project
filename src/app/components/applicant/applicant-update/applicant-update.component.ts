import { Location } from '@angular/common';
import { ApplicantService } from './../../../services/applicant.service';
import { IApplicantGetModel } from './../../../models/response/applicant/applicant-get-model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applicant-update',
  templateUrl: './applicant-update.component.html',
  styleUrls: ['./applicant-update.component.css'],
})
export class ApplicantUpdateComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private applicantService: ApplicantService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private location:Location ) {}

  applicantUpdateForm: FormGroup;
  applicant: IApplicantGetModel;

  ngOnInit(): void {
    this.getApplicantById();
  }

  getApplicantById() {
    this.activatedRoute.params.subscribe((params) => {
      this.getApplicant(params['id']);
    });
  }

  getApplicant(id: number) {
    this.applicantService.getApplicantById(id).subscribe((data) => {
      this.applicant = data;
      this.createApplicantUpdateForm();
    });
  }

  createApplicantUpdateForm() {
    this.applicantUpdateForm = this.formBuilder.group({
      firstName: [this.applicant.firstName, Validators.required],
      lastName: [this.applicant.lastName, Validators.required],
      email:new FormControl(this.applicant.email, [Validators.required, 
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password:new FormControl(this.applicant.password, [Validators.required, Validators.minLength(5)]),
      nationalIdentity: [this.applicant.nationalIdentity, Validators.required],
      dateOfBirth: [this.applicant.dateOfBirth, Validators.required],
      about: [this.applicant.about, Validators.required],
    });
  }
  updateToApplicant() {
    if (this.applicantUpdateForm.valid) {
    this.applicantService
      .updateToApplicant(
        this.activatedRoute.snapshot.params['id'],
        this.applicantUpdateForm.value
      )
      .subscribe(() => {
        this.toastrService.success(
          'Aday Bilgileri Güncellendi',
          'Tebrikler (:'
        );
      });
      this.location.back();
    } else {
      this.toastrService.error('Eksik Bilgi', '!!!');
    }
  }
}
