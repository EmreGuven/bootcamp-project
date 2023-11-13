import { ToastrService } from 'ngx-toastr';
import { ApplicantService } from './../../../services/applicant.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
      email:new FormControl('', [Validators.required, 
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password:new FormControl('', [Validators.required, Validators.minLength(5)]),
      nationalIdentity:new FormControl('', [Validators.required]),
      dateOfBirth: ['', Validators.required],
      about: ['', Validators.required],
      state:['1', Validators.required]
    });
  }

  addToApplicant() {
    if (this.applicantAddForm.valid) {
      let applicant = Object.assign({}, this.applicantAddForm.value);
      this.applicantService.addToApplicant(applicant).subscribe((data) => {
        console.log(data);
        
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
