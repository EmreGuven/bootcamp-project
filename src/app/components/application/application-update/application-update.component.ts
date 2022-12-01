import { IApplicationGetModel } from './../../../models/response/application/application-get-model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from './../../../services/application.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IApplicantGetAllModel } from 'src/app/models/response/applicant/applicant-getall-model';
import { IBootcampGetAllModel } from 'src/app/models/response/bootcamp/bootcamp-getall-model';
import { ApplicantService } from 'src/app/services/applicant.service';
import { BootcampService } from 'src/app/services/bootcamp.service';

@Component({
  selector: 'app-application-update',
  templateUrl: './application-update.component.html',
  styleUrls: ['./application-update.component.css'],
})
export class ApplicationUpdateComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private applicationService: ApplicationService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private applicantService: ApplicantService,
    private bootcampService: BootcampService
  ) {}

  applicationUpdateForm: FormGroup;
  application: IApplicationGetModel;
  applicants: IApplicantGetAllModel[];
  bootcamps: IBootcampGetAllModel[];

  ngOnInit(): void {
    this.getApplicationById();
    this.getApplicant();
    this.getBootcamp();
  }
  getApplicationById() {
    this.activatedRoute.params.subscribe((params) => {
      this.getApplications(params['id']);
    });
  }
  getApplications(id: number) {
    this.applicationService.getApplicationById(id).subscribe((data) => {
      this.application = data;
      this.createApplicationForm();
    });
  }
  createApplicationForm() {
    this.applicationUpdateForm = this.formBuilder.group({
      userId: [this.application.userId, Validators.required],
      bootcampId: [this.application.bootcampId, Validators.required],
      state: [this.application.state, Validators.required],
    });
  }
  updateToApplication() {
    this.applicationService
      .updateToApplication(
        this.activatedRoute.snapshot.params['id'],
        this.applicationUpdateForm.value
      )
      .subscribe(() => {
        this.toastrService.success(
          'Application Bilgileri Güncellendi',
          'Tebrikler (:'
        );
      });
  }

  getApplicant() {
    this.applicantService.getApplicants().subscribe((data) => {
      this.applicants = data;
    });
  }

  getBootcamp() {
    this.bootcampService.getBootcamps().subscribe((data) => {
      this.bootcamps = data;
    });
  }
}
