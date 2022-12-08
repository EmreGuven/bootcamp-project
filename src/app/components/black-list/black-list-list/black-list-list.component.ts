import { ApplicantService } from './../../../services/applicant.service';
import { ToastrService } from 'ngx-toastr';
import { BlacklistService } from './../../../services/blacklist.service';
import { IBlacklistGetAllModel } from './../../../models/response/blacklist/blacklist-getall-model';
import { Component, OnInit } from '@angular/core';
import { IApplicantGetAllModel } from 'src/app/models/response/applicant/applicant-getall-model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-black-list-list',
  templateUrl: './black-list-list.component.html',
  styleUrls: ['./black-list-list.component.css'],
})
export class BlackListListComponent implements OnInit {
  blacklists: IBlacklistGetAllModel[] = [];

  constructor(
    private blacklistService: BlacklistService,
    private applicantService: ApplicantService
  ) {}

  ngOnInit(): void {
    this.getBlacklists();
  }

  getBlacklists() {
    this.blacklistService.getBlacklists().subscribe((data) => {
      this.blacklists = data;
    });
  }

  deleteToBlacklist(id: number, applicantId:number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn bg-gradient-info active ms-3',
        cancelButton: 'btn bg-gradient-primary active',
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
          this.applicantService.updateToState(applicantId, 1).subscribe();
          this.blacklistService.deleteToBlacklist(id).subscribe(() => {
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
