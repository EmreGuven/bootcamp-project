import { ToastrService } from 'ngx-toastr';
import { IInstructorGetAllModel } from './../../../models/response/instructor/instructor-getall-model';
import { Component,OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { InstructorService } from 'src/app/services/instructor.service';
import Swal from 'sweetalert2';

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
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Emin misiniz?',
        text: 'Bu işlem geri alınamaz!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Evet!',
        cancelButtonText: 'Hayır',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.instructorService.deleteToInstructor(id).subscribe(() => {
            swalWithBootstrapButtons.fire(
              'Silindi!',
              'İstediğiniz veri silme işlemi tamamlandı.',
              'success'
            );
          }),
            setTimeout(() => {
              window.location.reload();
            }, 3000);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'İptal edildi',
            'Veriniz hala güvende :)',
            'error'
          );
        }
      });
  }
}
