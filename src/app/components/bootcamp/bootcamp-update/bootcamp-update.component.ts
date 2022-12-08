import { IBootcampUpdateModel } from './../../../models/request/bootcamp/bootcamp-update-model';
import { Location } from '@angular/common';
import { IInstructorGetAllModel } from './../../../models/response/instructor/instructor-getall-model';
import { InstructorService } from 'src/app/services/instructor.service';
import { IBootcampGetModel } from './../../../models/response/bootcamp/bootcamp-get-model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { BootcampService } from './../../../services/bootcamp.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbTypeaheadWindow } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead-window';

@Component({
  selector: 'app-bootcamp-update',
  templateUrl: './bootcamp-update.component.html',
  styleUrls: ['./bootcamp-update.component.css'],
})
export class BootcampUpdateComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private bootcampService: BootcampService,
    private instructorService: InstructorService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private location: Location
  ) {}

  bootcampUpdateForm: FormGroup;
  bootcamp: IBootcampGetModel;
  instructors: IInstructorGetAllModel[] = [];
  ngOnInit(): void {
    this.getInstructors();
  }
  getBootcampById() {
    this.activatedRoute.params.subscribe((params) => {
      this.getBootcamp(params['id']);
    });
  }

  getInstructors() {
    this.instructorService.getInstructors().subscribe((data) => {
      this.instructors = data;
      this.getBootcampById();
    });
  }

  getBootcamp(id: number) {
    this.bootcampService.getBootcampById(id).subscribe((data) => {
      this.bootcamp = data;
      this.createbootcampForm();
    });
  }
  createbootcampForm() {
    this.bootcampUpdateForm = this.formBuilder.group({
      instructerId: [this.bootcamp.instructerId, Validators.required],
      name: [this.bootcamp.name, Validators.required],
      dateStart: [this.bootcamp.dateStart, Validators.required],
      dateEnd: [this.bootcamp.dateEnd, Validators.required],
      state: [this.bootcamp.state, Validators.required],
      image: [this.bootcamp.image, Validators.required],
    });
  }

  updateToBootcamp() {
    if (this.bootcampUpdateForm.valid) {
      let bootcamp: IBootcampUpdateModel = Object.assign(
        {},
        this.bootcampUpdateForm.value
      );
      this.instructorService
        .getInstructorById(bootcamp.instructerId)
        .subscribe((ins) => {
          bootcamp.instructorName = ins.firstName + ' ' + ins.lastName;
          console.log(ins);

          this.bootcampService
            .updateToBootcamp(
              this.activatedRoute.snapshot.params['id'],
              bootcamp
            )
            .subscribe(() => {
              this.toastrService.success(
                'Bootcamp Bilgileri Güncellendi',
                'Tebrikler (:'
              );
            });
          this.location.back();
        });
    } else {
      this.toastrService.error('Eksik Bilgi', '!!!');
    }
  }
  
}
