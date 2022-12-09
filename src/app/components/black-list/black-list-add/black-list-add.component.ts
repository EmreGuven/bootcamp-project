import { IBlacklistAddModel } from './../../../models/request/blacklist/blacklist-add-model';
import { IBlacklistGetAllModel } from './../../../models/response/blacklist/blacklist-getall-model';
import { BlacklistService } from './../../../services/blacklist.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApplicantService } from 'src/app/services/applicant.service';
import { IApplicantGetAllModel } from 'src/app/models/response/applicant/applicant-getall-model';
import Swal from 'sweetalert2';
import { style } from '@angular/animations';

@Component({
  selector: 'app-black-list-add',
  templateUrl: './black-list-add.component.html',
  styleUrls: ['./black-list-add.component.css'],
})
export class BlackListAddComponent implements OnInit {
  blacklistAddForm: FormGroup;
  applicants: IApplicantGetAllModel[];
  blackLists: IBlacklistGetAllModel[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private blacklistService: BlacklistService,
    private toastrService: ToastrService,
    private applicantService: ApplicantService
  ) {}

  ngOnInit(): void {
    this.createBlacklistAddForm();
    this.getApplicants();
    this.getBlackList();
  }

  getApplicants() {
    this.applicantService.getApplicants().subscribe((data) => {
      this.applicants = data;
    });
    this.createBlacklistAddForm();
  }
  getBlackList() {
    this.blacklistService.getBlacklists().subscribe((data) => {
      this.blackLists = data;
    });
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
      let blacklist: IBlacklistAddModel = Object.assign(
        {},
        this.blacklistAddForm.value
      );

      this.applicantService
        .getApplicantById(blacklist.applicantId)
        .subscribe((applicant) => {
          blacklist.applicantName =
            applicant.firstName + ' ' + applicant.lastName;

          let flag = true;
          for (let black of this.blackLists) {
            if (blacklist.applicantId == black.id) {
              flag = false;
            }
          }
          if (flag) {
            this.blacklistService.addToBlacklist(blacklist).subscribe(() => {
              Swal.fire({
                icon: 'success',
                title:
                  '<h5>' +
                  blacklist.applicantName +
                  ' Kara Listeye Eklendi' +
                  '</h5>',
                showConfirmButton: false,
                timer: 2000,
              });
              this.applicantService.updateToState(applicant.id, 2).subscribe();
              this.clearForm();
            });
          } else {
            Swal.fire({ title: '<h5>' + 'Aday zaten Kara Listede' + '</h5>' });
            this.clearForm();
          }
        });
    } else {
      this.toastrService.error('Eksik Bilgi', '!!!');
    }
  }
  clearForm() {
    this.blacklistAddForm.reset();
  }
}
