import { IInstructorGetAllModel } from './../../../models/response/instructor/instructor-getall-model';
import { InstructorService } from './../../../services/instructor.service';
import { Component,OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.css']
})

export class InstructorListComponent implements OnInit {

  instructors:IInstructorGetAllModel[];

  displayedColumns: string[] = ['ID', 'Ad', 'Soyad'];

  dataSource:any

  constructor(private ınstructorService:InstructorService) { }

  ngOnInit(): void {
    this.getInstructors();
  }

  getInstructors() {
    this.ınstructorService.getInstructors().subscribe((data) => {
      this.instructors = data;
      this.dataSource = new MatTableDataSource(this.instructors)
    });
  }
}
