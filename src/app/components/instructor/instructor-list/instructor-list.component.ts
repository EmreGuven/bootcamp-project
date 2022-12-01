import { InstructorService } from './../../../services/instructor.service';
import { Component, OnInit } from '@angular/core';
import { IInstructorGetAllModel } from 'src/app/models/response/instructor/instructor-getall-model';

@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.css']
})
export class InstructorListComponent implements OnInit {

  instructors:IInstructorGetAllModel[]=[]
  constructor(private ınstructorService:InstructorService) { }

  ngOnInit(): void {
    this.getInstructors();
  }

  getInstructors() {
    this.ınstructorService.getInstructors().subscribe((data) => {
      this.instructors = data;
    });
  }
}
