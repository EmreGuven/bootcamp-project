import { ApplicationService } from 'src/app/services/application.service';
import { LoginGuard } from './../../../guards/login.guard';
import { InstructorService } from './../../../services/instructor.service';
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
  bootcampSaveData: any;
  constructor(
    private bootcampService: BootcampService,
    private toastrService: ToastrService,
    public instructorService: InstructorService,
    public loginGuard: LoginGuard,
    private applicationService: ApplicationService
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
  getBootcampData(data: any) {
    this.bootcampSaveData = data;
    this.addToApplication();
  }

  addToApplication() {
    let applicationData = Object.assign({});

    applicationData.id = this.bootcampSaveData.id;
    applicationData.state = this.bootcampSaveData.state;
    applicationData.applicantId = localStorage.getItem('id');
    applicationData.bootcampName = this.bootcampSaveData.name;

    if (applicationData.state == 1) {
      
      
          Swal.fire({
            customClass: {
              confirmButton: 'btn bg-gradient-info active ms-3',
              cancelButton: 'btn bg-gradient-primary active ms-3',
              denyButton: 'btn bg-gradient-secondary ms-3'
            },
            buttonsStyling: false,
            title: 'Kayıt olmak istediğinize emin misiniz ?',
            showDenyButton: true,
            showCancelButton: true,
            cancelButtonText:'iptal',
            confirmButtonText: 'evet',
            denyButtonText: `Vazgeç`,
          }).then((result) => {
            
            if (result.isConfirmed) {
              this.applicationService
        .addToApplication(applicationData)
        .subscribe(() => {
          
              Swal.fire('Kayıt başarılı !', '', 'success')
            });
            } else if (result.isDenied) {
              Swal.fire('Değişiklikler kaydedilmedi', '', 'info')
            }
          })
        
    } else {
      this.toastrService.warning('Bu kurs aktif değil');
    }
  }
}
