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
  apiUrl = 'http://localhost:3000/applicant';

  constructor(private httpClient: HttpClient) {}

  getApplicants(): Observable<IApplicantGetAllModel[]> {
    return this.httpClient.get<IApplicantGetAllModel[]>(this.apiUrl);
  }

  addToApplicant(applicant: IApplicantAddModel) {
    return this.httpClient.post(this.apiUrl, applicant);
  }

  updateToApplicant(id: number, applicant: IApplicantUpdateModel) {
    return this.httpClient.put(this.apiUrl + '/' + id, applicant);
  }

  deleteToApplicant(id: number) {
    return this.httpClient.delete(this.apiUrl + '/' + id);
  }
}
