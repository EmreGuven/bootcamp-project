import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { InstructorService } from './../../../services/instructor.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instructor-add',
  templateUrl: './instructor-add.component.html',
  styleUrls: ['./instructor-add.component.css']
})
export class InstructorAddComponent implements OnInit {

  instructorAddForm:FormGroup;
  constructor(private instructorService:InstructorService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createInstructorAddForm();
  }

  addToInstructor(){
    if (this.instructorAddForm.valid) {
      let instructor = Object.assign({}, this.instructorAddForm.value);
      this.instructorService.addToInstructor(instructor).subscribe((data) => {
        this.clearForm();
        
        this.toastrService.success('Yeni Eğitmen Eklendi', 'Tebrikler (:');
      });
    } else {
      this.toastrService.error('Eksik Bilgi', '!!!');
    }
  }
  clearForm(){
    this.instructorAddForm.reset();
  }
  


  createInstructorAddForm() {
    this.instructorAddForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      nationalIdentity: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      companyName: ['',Validators.required]
    });
    
  }

}