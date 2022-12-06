import { IBootcampAddModel } from './../../../models/request/bootcamp/bootcamp-add-model';
import { IBlacklistAddModel } from './../../../models/request/blacklist/blacklist-add-model';
import { IBootcampGetAllModel } from 'src/app/models/response/bootcamp/bootcamp-getall-model';
import { IInstructorGetAllModel } from './../../../models/response/instructor/instructor-getall-model';
import { InstructorService } from './../../../services/instructor.service';
import { ToastrService } from 'ngx-toastr';
import { BootcampService } from './../../../services/bootcamp.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bootcamp-add',
  templateUrl: './bootcamp-add.component.html',
  styleUrls: ['./bootcamp-add.component.css'],
})
export class BootcampAddComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private bootcampService: BootcampService,
    private instructorService: InstructorService,
    private toastrService: ToastrService
  ) {}

  bootcampAddForm: FormGroup;
  instructors: IInstructorGetAllModel[] = [];
  ngOnInit(): void {
    this.getInstructor();
  }

  getInstructor() {
    this.instructorService.getInstructors().subscribe((data) => {
      this.instructors = data;
    });
    this.createBootcampForm();
  }

  createBootcampForm() {
    this.bootcampAddForm = this.formBuilder.group({
      instructerId: ['', Validators.required],
      name: ['', Validators.required],
      dateStart: ['', Validators.required],
      dateEnd: ['', Validators.required],
      state: ['', Validators.required],
    });
  }
  addToBootcamp() {
    if (this.bootcampAddForm.valid) {
      let bootcamp: IBootcampAddModel = Object.assign({},this.bootcampAddForm.value);
      
      this.instructorService
        .getInstructorById(bootcamp.instructerId)
        .subscribe((ins) => {
          bootcamp.instructorName = ins.firstName + ' ' + ins.lastName;

          this.bootcampService.addToBootcamp(bootcamp).subscribe((data) => {
            this.clearForm();
            this.toastrService.success('Bootcamp Eklendi', 'Tebrikler (:');
          });
        });
    } else {
      this.toastrService.error('Eksik Bilgi', '!!!');
    }
  }
  clearForm() {
    this.bootcampAddForm.reset();
  }
}
