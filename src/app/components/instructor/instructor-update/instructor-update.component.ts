import { Location } from '@angular/common';
import { IInstructorGetModel } from './../../../models/response/instructor/instructor-get-model';
import { IInstructorUpdateModel } from './../../../models/request/instructor/instructor-update-model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InstructorService } from 'src/app/services/instructor.service';


@Component({
  selector: 'app-instructor-update',
  templateUrl: './instructor-update.component.html',
  styleUrls: ['./instructor-update.component.css']
})
export class InstructorUpdateComponent implements OnInit {

  constructor(private instructorService:InstructorService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute,
    private location:Location ) { }

    instructorUpdateForm:FormGroup;
    instructor:IInstructorGetModel
    
  ngOnInit(): void {
    this.getInstructorById();
  }
  getInstructorById() {
    this.activatedRoute.params.subscribe((params) => {
      this.getInstructors(params['id']);
    });
  }
  getInstructors(id:number){
    this.instructorService.getInstructorById(id).subscribe((data) => {
      this.instructor = data;
      this.createinstructorForm();
    });
  }
  createinstructorForm() {
    this.instructorUpdateForm = this.formBuilder.group({
      firstName: [this.instructor.firstName, Validators.required],
      lastName: [this.instructor.lastName, Validators.required],
      email: [this.instructor.email, Validators.required],
      password: [this.instructor.password, Validators.required],
      companyName: [this.instructor.companyName,Validators.required]
    });
  }
  updateToInstructor(){    
    if (this.instructorUpdateForm.valid) {
    this.instructorService.updateToInstructor(
      this.activatedRoute.snapshot.params["id"],
      this.instructorUpdateForm.value)
    .subscribe(()=>{
      this.toastrService.success("Eğitmen Bilgileri Güncellendi", 
      "Tebrikler (:")
    });
    this.location.back();
  } else {
    this.toastrService.error('Eksik Bilgi', '!!!');
  }
}
}
