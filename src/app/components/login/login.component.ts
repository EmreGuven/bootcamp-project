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
  user: ILoginUser[] = [];

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
    if (this.loginForm.valid) {
      this.authService.userLogin(this.loginForm.value).subscribe((data) => {
        if (data.length > 0) {
          this.toastrService.success(
            'Başarılı bir şekilde giriş yapıldı',
            'Tebrikler (:'
          );

          if (data[0].role == 'ROLE_EMPLOYEE') {
            this.router.navigate(['admin']);
            localStorage.setItem('token', data[0].token);
            localStorage.setItem('role', data[0].role);
          }

          if (data[0].role == 'ROLE_INSTRUCTOR') {
            this.router.navigate(['instructor']);
            localStorage.setItem('token', data[0].token);
            localStorage.setItem('role', data[0].role);
          }

          if (data[0].role == 'ROLE_APPLICANT') {
            this.router.navigate(['applicant']);
            localStorage.setItem('token', data[0].token);
            localStorage.setItem('role', data[0].role);
          }
        } else {
          this.toastrService.error('Giriş başarısız', '!!!');
        }
      });
    } else {
      this.toastrService.error(
        'Kullanıcı bilgileri hatalı',
        'Lütfen tekrar deneyiniz '
      );
    }
  }
}
