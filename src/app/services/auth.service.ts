
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITokenModel } from '../models/auth/token-model';
import { ILoginUser } from '../models/auth/user-login-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:3000/users';

  constructor(private httpClient: HttpClient) {}

  login(user: ILoginUser) {
    return this.httpClient.get<ITokenModel[]>(
      this.apiUrl + '?email=' + user.email + '&password=' + user.password
    );
  }

  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
}
