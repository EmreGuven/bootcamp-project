import { IApplicationAddModel } from './../models/request/application/application-add-model';
import { IApplicationUpdateModel } from './../models/request/application/application-update-model';
import { IApplicationGetModel } from './../models/response/application/application-get-model';
import { IApplicationGetAllModel } from './../models/response/application/application-getall-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  apiUrl = 'http://localhost:3000/application';

  constructor(private httpClient: HttpClient) {}

  getApplications(): Observable<IApplicationGetAllModel[]> {
    return this.httpClient.get<IApplicationGetAllModel[]>(this.apiUrl);
  }

  getApplicationById(id: number): Observable<IApplicationGetModel> {
    return this.httpClient.get<IApplicationGetModel>(this.apiUrl + '/' + id);
  }
  
  addToApplication(application: IApplicationAddModel) {
    
    return this.httpClient.post(this.apiUrl, application);
  }

  updateToApplication(id: number, application: IApplicationUpdateModel) {
    return this.httpClient.put(this.apiUrl + '/' + id, application);
  }

  deleteToApplication(id: number) {
    return this.httpClient.delete(this.apiUrl + '/' + id);
  }
}
