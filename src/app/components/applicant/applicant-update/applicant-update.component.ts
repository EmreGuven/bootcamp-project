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
    private location: Location
  ) {}

  applicantUpdateForm: FormGroup;
  applicant: IApplicantGetModel;

  ngOnInit(): void {}

  getApplicantById() {
    this.activatedRoute.params.subscribe((params) => {
      this.getApplicant(params['id']);
      this.deleteToApplicant(params['id']);
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
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      nationalIdentity: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      about: ['', Validators.required],
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
  }

  deleteToApplicant(id: number) {
    this.applicantService.deleteToApplicant(id).subscribe(() => {
      this.toastrService.success('Silme İşlemi Gerçekleşti', 'Tebrikler (:');
    });
  }
}
