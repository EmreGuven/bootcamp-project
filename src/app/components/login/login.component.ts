import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ILoginUser } from 'src/app/models/auth/user-login-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    let user: ILoginUser = this.loginForm.value;
    this.authService.login(user).subscribe((data) => {
      if (data.length > 0) {
        localStorage.setItem('token', JSON.stringify(data[0].token));
        this.toastrService.success(
          'Başarılı bir şekilde giriş yapıldı',
          'Tebrikler (:'
        );
        this.router.navigate(['admin']);
      } else {
        this.toastrService.error(
          'Kullanıcı bilgileri hatalı',
          'Lütfen tekrar deneyiniz ):'
        );
      }
    });
  }
}
