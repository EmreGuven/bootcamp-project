import { IBlacklistGetModel } from './../../../models/response/blacklist/blacklist-get-model';
import { BlacklistService } from './../../../services/blacklist.service';
import { IBlacklistUpdateModel } from './../../../models/request/blacklist/blacklist-update-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-black-list-update',
  templateUrl: './black-list-update.component.html',
  styleUrls: ['./black-list-update.component.css']
})
export class BlackListUpdateComponent implements OnInit {

  blacklistUpdateForm:FormGroup;
  blacklist:IBlacklistGetModel;

  constructor(private blacklistService:BlacklistService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute,
    private location:Location ) { }

  ngOnInit(): void {
    this.getBlacklistById();
  }

  getBlacklistById() {
    this.activatedRoute.params.subscribe((params) => {
      this.getBlacklists(params['id']);
      this.deleteToBlacklist(params['id']);
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
    this.blacklistService.updateToBlacklist(this.activatedRoute.snapshot.params["id"],this.blacklistUpdateForm.value)
    .subscribe(()=>{
      this.toastrService.success("Kara Liste Bilgileri Güncellendi", "Tebrikler (:")
    })
  }

  deleteToBlacklist(id: number) {
    this.blacklistService.deleteToBlacklist(id).subscribe(() => {
      this.ngOnInit();
      this.toastrService.success('Silme İşlemi Gerçekleşti', 'Tebrikler (:');
    });
  }

}
