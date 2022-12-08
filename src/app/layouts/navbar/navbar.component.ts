import { ILoginUser } from 'src/app/models/auth/user-login-model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  user:ILoginUser

  constructor(private store:Store<any>) { }

  ngOnInit(): void {
    this.getUserData()
  }

  getUserData(){
    this.store.select('profileReducer').subscribe((state)=>{
      (this.user=state)
      console.log(state);
    })
  }
}
