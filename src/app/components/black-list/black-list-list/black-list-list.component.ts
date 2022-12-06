import { ApplicantService } from './../../../services/applicant.service';
import { ToastrService } from 'ngx-toastr';
import { BlacklistService } from './../../../services/blacklist.service';
import { IBlacklistGetAllModel } from './../../../models/response/blacklist/blacklist-getall-model';
import { Component, OnInit } from '@angular/core';
import { IApplicantGetAllModel } from 'src/app/models/response/applicant/applicant-getall-model';

@Component({
  selector: 'app-black-list-list',
  templateUrl: './black-list-list.component.html',
  styleUrls: ['./black-list-list.component.css']
})
export class BlackListListComponent implements OnInit {

  blacklists:IBlacklistGetAllModel[]=[];
  
  constructor(private blacklistService:BlacklistService,
     private applicantService:ApplicantService,
     private toastrService:ToastrService ) { }

  ngOnInit(): void {
    this.getBlacklists();
  }

  getBlacklists() {
    this.blacklistService.getBlacklists().subscribe((data) => {
      this.blacklists = data;
    });
  }

  deleteToBlacklist(id: number) {
    this.blacklistService.deleteToBlacklist(id).subscribe(() => {
      this.toastrService.success('Silme İşlemi Gerçekleşti', 'Tebrikler (:');
      window.location.reload();
    });
  }

  
}
