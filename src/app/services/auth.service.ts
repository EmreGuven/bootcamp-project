import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITokenModel } from '../models/auth/token-model';
import { ILoginUser } from '../models/auth/user-login-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogin = false;
  roleAs: string;
  apiUrl = 'http://localhost:3000/users';

  constructor(private httpClient: HttpClient) {}

  userLogin(user: any) {
    return this.httpClient.get<ILoginUser[]>(
      this.apiUrl + '?email=' + user.email + '&password=' + user.password
    );
  }

  login(value: string) {
    this.isLogin = true;
    this.roleAs = value;
    localStorage.setItem('role', this.roleAs);
    return { success: this.isLogin, role: this.roleAs };
  }

  isLoggedIn() {
    const loggedIn = localStorage.getItem('token');
    if (loggedIn) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    return this.isLogin;
  }

  getRoles() {
    this.roleAs = localStorage.getItem('role');
    return this.roleAs;
  }

  /* logout(){
    this.isLogin = false;
    this.roleAs = '';
    localStorage.setItem('role','');
    return { success: this.isLogin, role: '' }
  } */
}
