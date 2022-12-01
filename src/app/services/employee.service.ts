import { IEmployeeGetModel } from './../models/response/employee/employee-get-model';
import { IEmployeeAddModel } from './../models/request/employee/employee-add-model';
import { IEmployeeGetAllModel } from './../models/response/employee/employee-getall-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  updateToEmployee(id: number, data: any) {
    return this.httpClient.put(this.apiUrl + '/' + id, data);
  }

  deleteToEmployee(id: number) {
    return this.httpClient.delete(this.apiUrl + '/' + id);
  }
}
