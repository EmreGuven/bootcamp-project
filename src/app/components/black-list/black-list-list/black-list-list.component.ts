import { BlacklistService } from './../../../services/blacklist.service';
import { IBlacklistGetAllModel } from './../../../models/response/blacklist/blacklist-getall-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-black-list-list',
  templateUrl: './black-list-list.component.html',
  styleUrls: ['./black-list-list.component.css']
})
export class BlackListListComponent implements OnInit {

  blacklists:IBlacklistGetAllModel[]=[];

  constructor(private blacklistService:BlacklistService ) { }

  ngOnInit(): void {
    this.getBlacklists();
  }

  getBlacklists() {
    this.blacklistService.getBlacklists().subscribe((data) => {
      this.blacklists = data;
    });
  }
}
