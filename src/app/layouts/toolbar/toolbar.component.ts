import { LogoutUser } from './../../store/actions/profile-actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { LoginGuard } from './../../guards/login.guard';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(public loginGuard:LoginGuard, private authService:AuthService,private router:Router,private store:Store) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.clear()
    this.store.dispatch(new LogoutUser);
    this.router.navigate([''])
  }

}
