import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserInfoResponse, UserListResponse, UserAutocompleteResponse } from 'src/app/model/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserInteractionsService {

  constructor(private httpClient: HttpClient) { 
  }

  GetUsers() {
    return this.httpClient.get<UserListResponse[]>(`${environment.userApiUrl}api/v1/userpage/GetUsers`)
      .pipe(map(user => {
        return user;
      }));
  }

  GetByUserName(userName: string) {
    return this.httpClient.get<UserInfoResponse>(`${environment.userApiUrl}api/v1/userpage/UserGetByUserName?userName=${userName}`)
      .pipe(map(user => {
        return user;
      }));
  }

  AutocompleteByUserName(keys: string) {
    return this.httpClient.get<UserAutocompleteResponse[]>(`${environment.userApiUrl}api/v1/userpage/AutocompleteByUserName?keys=${keys}`)
      .pipe(map(user => {
        return user;
      }));
  }
}