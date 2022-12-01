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
  styleUrls: ['./bootcamp-update.component.css']
})
export class BootcampUpdateComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private bootcampService:BootcampService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private location:Location
  ) {}

    bootcampUpdateForm:FormGroup;
    bootcamp: IBootcampGetModel

  ngOnInit(): void {
    this.getBootcampById();
  }
  getBootcampById() {
    this.activatedRoute.params.subscribe((params) => {
      this.getBootcamp(params['id']);
      this.deleteToBootcamp(params['id']);
    });
  }
  getBootcamp(id:number){
    this.bootcampService.getBootcampById(id).subscribe((data) => {
      this.bootcamp = data;
      this.createbootcampForm();
    });
  }
  createbootcampForm() {
    this.bootcampUpdateForm = this.formBuilder.group({
      instructerId:[this.bootcamp.instructerId, Validators.required],
      name:[this.bootcamp.name, Validators.required],
      dateStart:[this.bootcamp.dateStart, Validators.required],
      dateEnd:[this.bootcamp.dateEnd, Validators.required],
      state:[this.bootcamp.state, Validators.required],
    });
  }
  updateToBootcamp() {
    this.bootcampService
    .updateToBootcamp(
      this.activatedRoute.snapshot.params['id'],
      this.bootcampUpdateForm.value
    )
    .subscribe(() => {
      this.toastrService.success(
        'Bootcamp Bilgileri Güncellendi',
        'Tebrikler (:' 
      );
    });
  }
  deleteToBootcamp(id:number) {
    this.bootcampService.deleteToBootcamp(id).subscribe(() => {
      this.toastrService.success('Silme İşlemi Gerçekleşti', 'Tebrikler (:');
    });
  }
}
