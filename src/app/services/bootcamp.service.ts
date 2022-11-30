import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBootcampAddModel } from '../models/request/bootcamp/bootcamp-add-model';
import { IBootcampUpdateModel } from '../models/request/bootcamp/bootcamp-update-model';
import { IBootcampGetAllModel } from '../models/response/bootcamp/bootcamp-getall-model';

@Injectable({
  providedIn: 'root'
})
export class BootcampService {
  apiUrl = 'http://localhost:3000/bootcamp';

  constructor(private httpClient: HttpClient) { }

  getBootcamps(): Observable<IBootcampGetAllModel[]> {
    return this.httpClient.get<IBootcampGetAllModel[]>(this.apiUrl);
  }

  addToBootcamp(bootcamp: IBootcampAddModel) {
    return this.httpClient.post(this.apiUrl, bootcamp);
  }

  updateToBootcamp(id: number, bootcamp: IBootcampUpdateModel) {
    return this.httpClient.put(this.apiUrl + '/' + id, bootcamp);
  }

  deleteToBootcamp(id: number) {
    return this.httpClient.delete(this.apiUrl + '/' + id);
  }
}
