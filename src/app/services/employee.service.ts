import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployeeAddModel } from '../models/request/employee/employee-add-model';
import { IEmployeeUpdateModel } from '../models/request/employee/employee-update-model';
import { IEmployeeGetAllModel } from '../models/response/employee/employee-getall-model';


@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  apiUrl = 'http://localhost:3000/employee';

  constructor(private httpClient: HttpClient) {}

  getEmployees(): Observable<IEmployeeGetAllModel[]> {
    return this.httpClient.get<IEmployeeGetAllModel[]>(this.apiUrl);
  }

  addToEmployees(employee: IEmployeeAddModel) {
    return this.httpClient.post(this.apiUrl, employee);
  }

  updateToEmployees(id: number, employee: IEmployeeUpdateModel) {
    return this.httpClient.put(this.apiUrl + '/' + id, employee);
  }

  deleteToEmployees(id: number) {
    return this.httpClient.delete(this.apiUrl + '/' + id);
  }
}
