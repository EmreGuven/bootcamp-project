import { Location } from '@angular/common';
import { ApplicantService } from './../../../services/applicant.service';
import { IApplicantGetModel } from './../../../models/response/applicant/applicant-get-model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      email: [this.applicant.email, Validators.required],
      password: [this.applicant.password, Validators.required],
      nationalIdentity: [this.applicant.nationalIdentity, Validators.required],
      dateOfBirth: [this.applicant.dateOfBirth, Validators.required],
      about: [this.applicant.about, Validators.required],
    });
  }
  updateToApplicant() {
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
  }

 
}
