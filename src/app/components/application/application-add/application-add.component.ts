import { ToastrService } from 'ngx-toastr';
import { ApplicantService } from './../../../services/applicant.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/services/application.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-application-add',
  templateUrl: './application-add.component.html',
  styleUrls: ['./application-add.component.css']
})
export class ApplicationAddComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private applicationService:ApplicationService,
    private toastrService:ToastrService
  ) {}

  applicationAddForm:FormGroup;

  ngOnInit(): void {
    this.createApplicationForm();
  }
  createApplicationForm() {
    this.applicationAddForm = this.formBuilder.group({
      applicantId:['', Validators.required],
      bootcampId:['', Validators.required],
      state:['', Validators.required]
    });
  }
  addToApplication() {
    if(this.applicationAddForm.valid) {
      let application = Object.assign({}, this.applicationAddForm.value);
      this.applicationService.addToApplication(application).subscribe((data) => {
        this.clearForm();
        this.toastrService.success('Application Eklendi', 'Tebrikler (:');
      });
    }else {
      this.toastrService.error('Eksik Bilgi', '!!!');  
    }
  }
  clearForm() {
    this.applicationAddForm.reset();
  }

}
