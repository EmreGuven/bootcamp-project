import { IUserRegister } from 'src/app/models/auth/user-register-model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userAddForm: FormGroup;
  users: IUserRegister;
  constructor(
    private formBuilder: FormBuilder,
    private activatedroute: ActivatedRoute,
    private registerService: RegisterService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createUserAddForm();
  }

  createUserAddForm() {
    this.userAddForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  addUser() {
    if (this.userAddForm.valid) {
      let userModel = Object.assign({}, this.userAddForm.value);
      this.registerService.addUsers(userModel).subscribe((data) => {
        this.toastrService.success('Kullanıcı Oluşturuldu', 'Tebrikler (:');
        this.router.navigate(['admin']);
      });
    } else {
      this.toastrService.error('Eksik bilgi', 'Lütfen tekrar deneyiniz');
    }
  }
}
