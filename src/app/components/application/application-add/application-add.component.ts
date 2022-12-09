import { IApplicationAddModel } from './../../../models/request/application/application-add-model';
import { IBootcampGetAllModel } from './../../../models/response/bootcamp/bootcamp-getall-model';
import { BootcampService } from './../../../services/bootcamp.service';
import { ToastrService } from 'ngx-toastr';
import { ApplicantService } from './../../../services/applicant.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/services/application.service';
import { IApplicantGetAllModel } from 'src/app/models/response/applicant/applicant-getall-model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-application-add',
  templateUrl: './application-add.component.html',
  styleUrls: ['./application-add.component.css'],
})
export class ApplicationAddComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private applicationService: ApplicationService,
    private toastrService: ToastrService,
    private applicantService: ApplicantService,
    private bootcampService: BootcampService
  ) {}

  applicationAddForm: FormGroup;
  applicants: IApplicantGetAllModel[];
  bootcamps: IBootcampGetAllModel[];

  ngOnInit(): void {
    this.createApplicationForm();
    this.getApplicants();
    this.getBootcamps();
  }
  createApplicationForm() {
    this.applicationAddForm = this.formBuilder.group({
      userId: ['', Validators.required],
      bootcampId: ['', Validators.required],
      state: ['', Validators.required],
    });
  }
  addToApplication() {
    if (this.applicationAddForm.valid) {
      let application: IApplicationAddModel = Object.assign(
        {},
        this.applicationAddForm.value
      );
      this.bootcampService
        .getBootcampById(application.bootcampId)
        .subscribe((bootcamp) => {
          application.bootcampName = bootcamp.name;

          this.applicantService
            .getApplicantById(application.userId)
            .subscribe((applicant) => {
              application.applicantName =
                applicant.firstName + ' ' + applicant.lastName;

              this.applicationService
                .addToApplication(application)
                .subscribe((data) => {
                  Swal.fire({
                    icon: 'success',
                    title:'Aday Eklendi',
                    showConfirmButton: false,
                    timer: 2000
                  })
                  this.clearForm();
                });
            });
        });
    } else {
      this.toastrService.error('Eksik Bilgi', '!!!');
    }
  }
  clearForm() {
    this.applicationAddForm.reset();
  }

  getApplicants() {
    this.applicantService.getApplicants().subscribe((data) => {
      this.applicants = data;
    });
    this.createApplicationForm();
  }

  getBootcamps() {
    this.bootcampService.getBootcamps().subscribe((data) => {
      this.bootcamps = data;
    });
    this.createApplicationForm();
  }
}
