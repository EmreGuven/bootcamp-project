import { BootcampService } from './../../../services/bootcamp.service';
import { IBootcampGetAllModel } from './../../../models/response/bootcamp/bootcamp-getall-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bootcamp-list',
  templateUrl: './bootcamp-list.component.html',
  styleUrls: ['./bootcamp-list.component.css']
})
export class BootcampListComponent implements OnInit {

  bootcamps:IBootcampGetAllModel[]=[]

  constructor(private bootcampService:BootcampService) { }

  ngOnInit(): void {
    this.getBootcamps();
  }
  getBootcamps() {
    this.bootcampService.getBootcamps().subscribe((data) => {
      this.bootcamps = data;
    })
  }
}
