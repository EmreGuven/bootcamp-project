import { IBlacklistAddModel } from './../../../models/request/blacklist/blacklist-add-model';
import { IBlacklistGetAllModel } from './../../../models/response/blacklist/blacklist-getall-model';
import { BlacklistService } from './../../../services/blacklist.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApplicantService } from 'src/app/services/applicant.service';
import { IApplicantGetAllModel } from 'src/app/models/response/applicant/applicant-getall-model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-black-list-add',
  templateUrl: './black-list-add.component.html',
  styleUrls: ['./black-list-add.component.css'],
})
export class BlackListAddComponent implements OnInit {
  blacklistAddForm: FormGroup;
  applicants: IApplicantGetAllModel[];

  constructor(
    private formBuilder: FormBuilder,
    private blacklistService: BlacklistService,
    private toastrService: ToastrService,
    private applicantService: ApplicantService
  ) {}

  ngOnInit(): void {
    this.createBlacklistAddForm();
    this.getApplicants();
  }

  getApplicants() {
    this.applicantService.getApplicants().subscribe((data) => {
      this.applicants = data;
    });
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
      let blacklist: IBlacklistAddModel = Object.assign(
        {},
        this.blacklistAddForm.value
      );
      this.applicantService
        .getApplicantById(blacklist.applicantId)
        .subscribe((applicant) => {
          blacklist.applicantName =
            applicant.firstName + ' ' + applicant.lastName;

          this.blacklistService.addToBlacklist(blacklist).subscribe(() => {
            Swal.fire({
              icon: 'success',
              title: blacklist.applicantName + ' Kara Listeye Eklendi',
              showConfirmButton: false,
              timer: 2000
            })
            this.clearForm();
            
          });
          this.applicantService.updateToState(applicant.id, 2).subscribe();
        });
    } else {
      this.toastrService.error('Eksik Bilgi', '!!!');
    }
  }
  clearForm() {
    this.blacklistAddForm.reset();
  }
}
