import { IApplicationGetModel } from './../../../models/response/application/application-get-model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from './../../../services/application.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-application-update',
  templateUrl: './application-update.component.html',
  styleUrls: ['./application-update.component.css']
})
export class ApplicationUpdateComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private applicationService:ApplicationService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private location:Location
  ) {}

    applicationUpdateForm:FormGroup;
    application: IApplicationGetModel

  ngOnInit(): void {
    this.getApplicationById();
  }
  getApplicationById() {
    this.activatedRoute.params.subscribe((params) => {
      this.getApplications(params['id']);
      this.deleteToApplication(params['id']);
    });
  }
  getApplications(id:number) {
    this.applicationService.getApplicationById(id).subscribe((data) => {
      this.application = data;
      this.createApplicationForm();
    });
  }
  createApplicationForm() {
    this.applicationUpdateForm = this.formBuilder.group({
      userId:[this.application.userId, Validators.required],
      bootcampId:[this.application.bootcampId, Validators.required],
      state:[this.application.state, Validators.required]
    });
  }
  updateToApplication() {
    this.applicationService.updateToApplication(
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
  deleteToApplication(id:number) {
    this.applicationService.deleteToApplication(id).subscribe(() => {
      this.toastrService.success('Silme İşlemi Gerçekleşti', 'Tebrikler (:');
    });
  }
}
