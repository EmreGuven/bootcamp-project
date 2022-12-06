import { InstructorService } from './../../../services/instructor.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BootcampService } from './../../../services/bootcamp.service';
import { IBootcampGetAllModel } from './../../../models/response/bootcamp/bootcamp-getall-model';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

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
          this.bootcampService.deleteToBootcamp(id).subscribe(() => {
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
