import { IUserModel } from './../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  apiUrl = 'http://localhost:3000/users';

  constructor(private httpClient: HttpClient) {}

  getUsers():Observable<IUserModel[]> {

   return this.httpClient.get<IUserModel[]>(this.apiUrl)
  }

  getUserById(id:number):Observable<IUserModel>{
    return this.httpClient.get<IUserModel>(this.apiUrl+"/"+id)
  }
}
