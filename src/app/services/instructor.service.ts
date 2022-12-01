import { IInstructorUpdateModel } from './../models/request/instructor/instructor-update-model';
import { IInstructorAddModel } from './../models/request/instructor/instructor-add-model';
import { IInstructorGetAllModel } from './../models/response/instructor/instructor-getall-model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IInstructorGetModel } from '../models/response/instructor/instructor-get-model';

@Injectable({
  providedIn: 'root',
})
export class InstructorService {
  apiUrl = 'http://localhost:3000/instructor';

  constructor(private httpClient: HttpClient) {}

  getInstructors(): Observable<IInstructorGetAllModel[]> {
    return this.httpClient.get<IInstructorGetAllModel[]>(this.apiUrl);
  }
  getInstructorById(id:number): Observable<IInstructorGetModel[]> {
    return this.httpClient.get<IInstructorGetModel[]>(this.apiUrl+"/"+ id);
  }

  addToInstructor(instructor: IInstructorAddModel) {
    return this.httpClient.post(this.apiUrl, instructor);
  }

  updateToInstructor(id: number, instructor: IInstructorUpdateModel) {
    return this.httpClient.put(this.apiUrl + '/' + id, instructor);
  }

  deleteToInstructor(id: number) {
    return this.httpClient.delete(this.apiUrl + '/' + id);
  }
}
