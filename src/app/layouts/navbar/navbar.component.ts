import { UserService } from './../../services/user.service';
import { IUserModel } from './../../models/user.model';
import { ILoginUser } from 'src/app/models/auth/user-login-model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: IUserModel;

  constructor(private store: Store<any>,private userService:UserService) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.store.select('profileReducer').subscribe((state) => {
      this.user = state
    });
  }
}
