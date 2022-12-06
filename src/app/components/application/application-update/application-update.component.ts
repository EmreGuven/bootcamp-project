import { Location } from '@angular/common';
import { IApplicationGetModel } from './../../../models/response/application/application-get-model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from './../../../services/application.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IApplicantGetAllModel } from 'src/app/models/response/applicant/applicant-getall-model';
import { IBootcampGetAllModel } from 'src/app/models/response/bootcamp/bootcamp-getall-model';
import { ApplicantService } from 'src/app/services/applicant.service';
import { BootcampService } from 'src/app/services/bootcamp.service';
import { IApplicationUpdateModel } from 'src/app/models/request/application/application-update-model';

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
    private bootcampService: BootcampService,
    private location:Location ) {}

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
      userId: new FormControl(this.application.userId, [Validators.required]),
      bootcampId: new FormControl(this.application.bootcampId, [Validators.required]),
      state: new FormControl(this.application.state, [Validators.required]),
    });
  }
  updateToApplication() {
    if(this.applicationUpdateForm.valid){

      let application: IApplicationUpdateModel = Object.assign({},this.applicationUpdateForm.value);
      this.bootcampService
        .getBootcampById(application.bootcampId)
        .subscribe((bootcamp) => {
          application.bootcampName = bootcamp.name ;
          console.log(bootcamp);

          this.applicantService
        .getApplicantById(application.userId)
        .subscribe((applicant) => {
          application.applicantName = applicant.firstName+ ' ' + applicant.lastName;
          console.log(applicant);

    this.applicationService
      .updateToApplication(
        this.activatedRoute.snapshot.params['id'],application)
      .subscribe(() => {
        this.toastrService.success(
          'Application Bilgileri Güncellendi',
          'Tebrikler (:'
        );
      });      
      this.location.back();
    })});
    }else {
      this.toastrService.error('Eksik Bilgi', '!!!');
    }
  }

  getApplicant() {
    this.applicantService.getApplicants().subscribe((data) => {
      this.applicants = data;
      this.getApplicationById();
    });
  }

  getBootcamp() {
    this.bootcampService.getBootcamps().subscribe((data) => {
      this.bootcamps = data;
      this.getApplicationById();
    });
  }
}
