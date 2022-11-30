import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployeeModelRequest } from '../models/request/employee-model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl = "http://localhost:3000/employee"

  constructor(private httpClient:HttpClient) { }

  getEmployees():Observable<IEmployeeModelRequest[]>{
    return this.httpClient.get<IEmployeeModelRequest[]>(this.apiUrl);
  }
}
