import { IUserRegister } from '../models/auth/user-register-model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  apiUrl = 'http://localhost:3000/users';

  constructor(private httpClient:HttpClient) { }

  addUsers(user:IUserRegister){
    return this.httpClient.post(this.apiUrl, user);
  }
}
