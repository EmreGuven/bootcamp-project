import { BlacklistService } from './../../../services/blacklist.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-black-list-add',
  templateUrl: './black-list-add.component.html',
  styleUrls: ['./black-list-add.component.css']
})
export class BlackListAddComponent implements OnInit {

  blacklistAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private blacklistService: BlacklistService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createBlacklistAddForm();
  }

  createBlacklistAddForm() {
    this.blacklistAddForm = this.formBuilder.group({
      applicantId: ['', Validators.required],
      date: ['', Validators.required],
      reason: ['', Validators.required],
    });
  }
  addToBlacklist() {
    if (this.blacklistAddForm.valid) {
      let blacklist = Object.assign({}, this.blacklistAddForm.value);
      this.blacklistService.addToBlacklist(blacklist).subscribe((data) => {
        this.clearForm();
        this.toastrService.success('Kara Listeye Eklendi', 'Tebrikler (:');
      });
    } else {
      this.toastrService.error('Eksik Bilgi', '!!!');
    }
  }
  clearForm() {
    this.blacklistAddForm.reset();
  }

}
