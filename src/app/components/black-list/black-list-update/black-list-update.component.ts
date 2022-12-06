import { Location } from '@angular/common';
import { IBlacklistGetModel } from './../../../models/response/blacklist/blacklist-get-model';
import { BlacklistService } from './../../../services/blacklist.service';
import { IBlacklistUpdateModel } from './../../../models/request/blacklist/blacklist-update-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ApplicantService } from 'src/app/services/applicant.service';
import { IApplicantGetAllModel } from 'src/app/models/response/applicant/applicant-getall-model';

@Component({
  selector: 'app-black-list-update',
  templateUrl: './black-list-update.component.html',
  styleUrls: ['./black-list-update.component.css']
})
export class BlackListUpdateComponent implements OnInit {

  blacklistUpdateForm:FormGroup;
  blacklist:IBlacklistGetModel;
  applicants:IApplicantGetAllModel[];
  

  constructor(private blacklistService:BlacklistService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute,
    private applicantService:ApplicantService,
    private location:Location ) { }

  ngOnInit(): void {
    this.getBlacklistById();
    this.getApplicants();
  }

  getBlacklistById() {
    this.activatedRoute.params.subscribe((params) => {
      this.getBlacklists(params['id']);
    });
  }

  getBlacklists(id: number) {
    this.blacklistService.getBlacklistById(id).subscribe((data) => {
      this.blacklist = data;
      this.createBlacklistUpdateForm();
    });
  }

  createBlacklistUpdateForm() {
    this.blacklistUpdateForm = this.formBuilder.group({
      applicantId: [this.blacklist.applicantId, Validators.required],
      date: [this.blacklist.date, Validators.required],
      reason: [this.blacklist.reason, Validators.required],
    });
  }

  updateToBlacklist(){
    if (this.blacklistUpdateForm.valid) {

      let blacklist: IBlacklistUpdateModel = Object.assign({},this.blacklistUpdateForm.value);
      this.applicantService
        .getApplicantById(blacklist.applicantId)
        .subscribe((applicant) => {
          blacklist.applicantName = applicant.firstName + ' ' + applicant.lastName;
          console.log(applicant);

    this.blacklistService.updateToBlacklist(this.activatedRoute.snapshot.params["id"],blacklist)
    .subscribe(()=>{
      this.toastrService.success("Kara Liste Bilgileri Güncellendi", "Tebrikler (:")
    });
    this.location.back();
  });
    } else {
      this.toastrService.error('Eksik Bilgi', '!!!');
    }
  }

  getApplicants(){
    this.applicantService.getApplicants().subscribe((data)=>{
      this.applicants = data
    })
  }

}
