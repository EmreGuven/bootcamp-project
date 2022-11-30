import { IApplicantUpdateModel } from './../models/request/applicant/applicant-update-model';
import { IApplicantAddModel } from './../models/request/applicant/applicant-add-model';
import { IApplicantGetAllModel } from './../models/response/applicant/applicant-getall-model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApplicantService {

  constructor() { }
}
