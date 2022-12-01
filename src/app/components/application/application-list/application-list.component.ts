import { ToastrService } from 'ngx-toastr';
import { ApplicationService } from './../../../services/application.service';
import { IApplicationGetAllModel } from './../../../models/response/application/application-getall-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {

  applications:IApplicationGetAllModel[]=[]

  constructor(private applicationService:ApplicationService,
              private toastrService:ToastrService
    ) {}

  ngOnInit(): void {
    this.getApplications();
  }
  getApplications() {
    this.applicationService.getApplications().subscribe((data) => {
      this.applications = data;
    })
  }
  deleteToApplication(id:number) {
    this.applicationService.deleteToApplication(id).subscribe(() => {
      this.toastrService.success('Silme İşlemi Gerçekleşti', 'Tebrikler (:');
      window.location.reload();
    });
  }
}
