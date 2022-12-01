import { InstructorService } from './../../../services/instructor.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BootcampService } from './../../../services/bootcamp.service';
import { IBootcampGetAllModel } from './../../../models/response/bootcamp/bootcamp-getall-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bootcamp-list',
  templateUrl: './bootcamp-list.component.html',
  styleUrls: ['./bootcamp-list.component.css'],
})
export class BootcampListComponent implements OnInit {
  bootcamps: IBootcampGetAllModel[] = [];

  constructor(
    private bootcampService: BootcampService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    public instructorService: InstructorService
  ) {}

  ngOnInit(): void {
    this.getBootcamps();
  }
  getBootcamps() {
    this.bootcampService.getBootcamps().subscribe((data) => {
      this.bootcamps = data;
    });
  }
  deleteToBootcamp(id: number) {
    this.activatedRoute.params.subscribe(() => {
      this.bootcampService.deleteToBootcamp(id).subscribe(() => {
        this.toastrService.success('Silme İşlemi Gerçekleşti', 'Tebrikler (:');
      });
    });
  }
}
