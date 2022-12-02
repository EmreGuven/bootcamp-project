import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { IApplicantGetAllModel } from './../../../models/response/applicant/applicant-getall-model';
import { ApplicantService } from './../../../services/applicant.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applicant-list',
  templateUrl: './applicant-list.component.html',
  styleUrls: ['./applicant-list.component.css'],
})
export class ApplicantListComponent implements OnInit {
  
  constructor(private applicantService: ApplicantService,
     private toastrService:ToastrService,
     private location:Location) {}

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
    this.applicantService.deleteToApplicant(id).subscribe(() => {
      this.toastrService.success('Silme İşlemi Gerçekleşti', 'Tebrikler (:');
      window.location.reload();
    });
  }
}
