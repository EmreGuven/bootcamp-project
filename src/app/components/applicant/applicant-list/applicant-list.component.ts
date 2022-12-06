import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { IApplicantGetAllModel } from './../../../models/response/applicant/applicant-getall-model';
import { ApplicantService } from './../../../services/applicant.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-applicant-list',
  templateUrl: './applicant-list.component.html',
  styleUrls: ['./applicant-list.component.css'],
})

export class ApplicantListComponent implements OnInit {

  @ViewChild('deleted', { static: false }) private deleted: SwalComponent;

  constructor(
    private applicantService: ApplicantService,
    private toastrService: ToastrService
  ) {}

  applicants: IApplicantGetAllModel[] = [];

  ngOnInit(): void {
    this.getApplicants();
  }

  getApplicants() {
    this.applicantService.getApplicants().subscribe((data) => {
      this.applicants = data;
    });
  }

  deleteToApplicant(id: number) {
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
          this.applicantService.deleteToApplicant(id).subscribe(() => {
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
