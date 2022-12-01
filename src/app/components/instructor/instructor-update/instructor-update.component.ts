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

  instructorUpdateForm:FormGroup;
  instructor:IInstructorUpdateModel;

  constructor(private instructorService:InstructorService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute,
    private location:Location ) { }

  ngOnInit(): void {
    this.getInstructorDataForm();
    this.updateToInstructor();
    this.createInstructorUpdateForm();

  }

  updateToInstructor(){
    this.instructorService.updateToInstructor(this.activatedRoute.snapshot.params["id"],this.instructorUpdateForm.value)
    .subscribe(()=>{
      this.toastrService.success("Eğitmen Bilgileri Güncellendi", "Tebrikler (:")
    
    })
  }

  createInstructorUpdateForm() {
    this.instructorUpdateForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      nationalIdentity: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
      companyName: [null,Validators.required]
    });
  }

  getInstructorDataForm(){
    this.instructorService.getInstructorById(this.activatedRoute.snapshot.params["id"]).subscribe((result)=>{
      this.instructorUpdateForm = new FormGroup({
        firstName: new FormControl(result['adi']),
        lastName: new FormControl(result['branssoyadioyadidId']),
        email: new FormControl(result['email']),
        password: new FormControl(result['sifre']),
        nationalIdentity: new FormControl(result['tc']),
        dateOfBirth:new FormControl(result['dogumtarihi']),
        companyName: new FormControl(result['firma']),
      })
    })
  }

  deleteToInstructor(id: any) {
    this.instructorService.deleteToInstructor(id).subscribe(() => {
      this.ngOnInit();
      this.toastrService.success('Silme İşlemi Gerçekleşti', 'Tebrikler (:');
    });
  }



}
