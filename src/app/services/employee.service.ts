import { IEmployeeGetModel } from './../models/response/employee/employee-get-model';
import { IEmployeeAddModel } from './../models/request/employee/employee-add-model';
import { IEmployeeGetAllModel } from './../models/response/employee/employee-getall-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployeeUpdateModel } from '../models/request/employee/employee-update-model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  apiUrl = 'http://localhost:3000/employee';

  constructor(private httpClient: HttpClient) {}

  getEmployees(): Observable<IEmployeeGetAllModel[]> {
    return this.httpClient.get<IEmployeeGetAllModel[]>(this.apiUrl);
  }

  getEmployeById(id: number): Observable<IEmployeeGetModel> {
    return this.httpClient.get<IEmployeeGetModel>(this.apiUrl + '/' + id);
  }
  
  addToEmployee(employee: IEmployeeAddModel) {
    return this.httpClient.post(this.apiUrl, employee);
  }

  updateToEmployee(id: number, employee: IEmployeeUpdateModel) {
    return this.httpClient.put(this.apiUrl + '/' + id, employee);
  }

  deleteToEmployee(id: number) {
    return this.httpClient.delete(this.apiUrl + '/' + id);
  }
}
