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
  blacklist:IBlacklistUpdateModel;

  constructor(private blacklistService:BlacklistService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute,
    private location:Location ) { }

  ngOnInit(): void {
    this.getBlacklistDataForm();
    this.updateToBlacklist();
    this.createBlacklistUpdateForm();

  }

  updateToBlacklist(){
    this.blacklistService.updateToBlacklist(this.activatedRoute.snapshot.params["id"],this.blacklistUpdateForm.value)
    .subscribe(()=>{
      this.toastrService.success("Kara Liste Bilgileri Güncellendi", "Tebrikler (:")
    
    })
  }

  createBlacklistUpdateForm() {
    this.blacklistUpdateForm = this.formBuilder.group({
      applicantId: [null, Validators.required],
      date: [null, Validators.required],
      reason: [null, Validators.required],
    });
  }

  getBlacklistDataForm(){
    this.blacklistService.getBlacklistById(this.activatedRoute.snapshot.params["id"]).subscribe((result)=>{
      this.blacklistUpdateForm = new FormGroup({
        applicantId: new FormControl(result['basvuranId']),
        date: new FormControl(result['tarih']),
        reason: new FormControl(result['sebep']),
      })
    })
  }

  deleteToBlacklist(id: any) {
    this.blacklistService.deleteToBlacklist(id).subscribe(() => {
      this.ngOnInit();
      this.toastrService.success('Silme İşlemi Gerçekleşti', 'Tebrikler (:');
    });
  }

}
