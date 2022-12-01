import { IBlacklistUpdateModel } from './../models/request/blacklist/blacklist-update-model';
import { IBlacklistAddModel } from './../models/request/blacklist/blacklist-add-model';
import { IBlacklistGetModel } from './../models/response/blacklist/blacklist-get-model';
import { IBlacklistGetAllModel } from './../models/response/blacklist/blacklist-getall-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlacklistService {

  apiUrl = 'http://localhost:3000/blackList';

  constructor(private httpClient: HttpClient) {}

  getBlacklists(): Observable<IBlacklistGetAllModel[]> {
    return this.httpClient.get<IBlacklistGetAllModel[]>(this.apiUrl);
  }

  getBlacklistById(id: number): Observable<IBlacklistGetModel> {
    return this.httpClient.get<IBlacklistGetModel>(this.apiUrl + '/' + id);
  }
  
  addToBlacklist(blacklist: IBlacklistAddModel) {
    return this.httpClient.post(this.apiUrl, blacklist);
  }

  updateToBlacklist(id: number, blacklist: IBlacklistUpdateModel) {
    return this.httpClient.put(this.apiUrl + '/' + id, blacklist);
  }

  deleteToBlacklist(id: number) {
    return this.httpClient.delete(this.apiUrl + '/' + id);
  }
}
