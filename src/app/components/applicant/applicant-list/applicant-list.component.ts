import { IApplicantGetAllModel } from './../../../models/response/applicant/applicant-getall-model';
import { ApplicantService } from './../../../services/applicant.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applicant-list',
  templateUrl: './applicant-list.component.html',
  styleUrls: ['./applicant-list.component.css'],
})
export class ApplicantListComponent implements OnInit {
  constructor(private applicantService: ApplicantService) {}

  applicants: IApplicantGetAllModel[] = [];

  ngOnInit(): void {
    this.getApplicants();
  }

  getApplicants() {
    this.applicantService.getApplicants().subscribe((data) => {
      this.applicants = data;
    });
  }
}
