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

  constructor(public loginGuard:LoginGuard, private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }

}
