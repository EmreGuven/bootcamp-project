
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginUser } from '../models/auth/user-login-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl='http://localhost:3000/users'

  constructor(private httpClient:HttpClient) { }

  loginUser(user:ILoginUser):Observable<ILoginUser[]>{
    return this.httpClient.get<ILoginUser[]>(this.apiUrl+"?email="+user.email+"&password="+user.password)
  }

}
