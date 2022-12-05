import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
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
      email:new FormControl('', [Validators.required, 
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password:new FormControl('', [Validators.required, Validators.minLength(5)]),
      nationalIdentity: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      companyName: ['',Validators.required]
    });
    
  }

}