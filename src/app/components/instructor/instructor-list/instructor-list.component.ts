import { ToastrService } from 'ngx-toastr';
import { IInstructorGetAllModel } from './../../../models/response/instructor/instructor-getall-model';
import { Component,OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { InstructorService } from 'src/app/services/instructor.service';

@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.css']
})

export class InstructorListComponent implements OnInit {

  instructors:IInstructorGetAllModel[];

  displayedColumns: string[] = ['ID', 'Ad', 'Soyad'];

  dataSource:any

  constructor(private instructorService:InstructorService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getInstructors();
  }

  getInstructors() {
    this.instructorService.getInstructors().subscribe((data) => {
      this.instructors = data;
      this.dataSource = new MatTableDataSource(this.instructors)
    });
  }

  deleteToInstructor(id: number) {
    this.instructorService.deleteToInstructor(id).subscribe(() => {
      this.toastrService.success('Silme İşlemi Gerçekleşti', 'Tebrikler (:');
      window.location.reload();
    });
  }
}
