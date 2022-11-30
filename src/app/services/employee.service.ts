import { IEmployeeGetAllModel } from './../models/response/employee/employee-getall-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl = "http://localhost:3000/employee"

  constructor(private httpClient:HttpClient) { }

  getEmployees():Observable<IEmployeeGetAllModel[]>{
    return this.httpClient.get<IEmployeeGetAllModel[]>(this.apiUrl);
  }
}
