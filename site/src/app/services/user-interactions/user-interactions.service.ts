import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserInfoResponse, UserListResponse, UserAutocompleteResponse, UserMapResponse } from 'src/app/model/user';
import { CommentVoteResponse, VoteResponse } from 'src/app/model/vote';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserInteractionsService {

  constructor(private httpClient: HttpClient) { 
  }

  GetUsers() {
    return this.httpClient.get<UserListResponse[]>(`${environment.usersApiUrl}api/v1/userpage/GetUsers`)
      .pipe(map(user => {
        return user;
      }));
      
  }

  GetUserMapById(id: string) {
    return this.httpClient.get<UserMapResponse>(`${environment.usersApiUrl}api/v1/userpage/GetUsersMap?userId=${id}`)
      .pipe(map(user => {
        return user;
      }));
  }

  GetByUserName(userName: string) {
    return this.httpClient.get<UserInfoResponse>(`${environment.usersApiUrl}api/v1/userpage/UserGetByUserName?userName=${userName}`)
      .pipe(map(user => {
        return user;
      }));
  }

  AutocompleteByUserName(keys: string) {
    return this.httpClient.get<UserAutocompleteResponse[]>(`${environment.usersApiUrl}api/v1/userpage/AutocompleteByUserName?keys=${keys}`)
      .pipe(map(user => {
        return user;
      }));
  }

  GetUsersByKey(keys: string) {
    return this.httpClient.get<UserListResponse[]>(`${environment.usersApiUrl}api/v1/userpage/GetUsersByKey?keys=${keys}`)
      .pipe(map(user => {
        return user;
      }));
  }

  GetCommentVotesByUser(userId: string){
    return this.httpClient.get<CommentVoteResponse[]>(`${environment.postsInteractionsApi}api/v1/CommentVoteUser/GetCommentVoteByUser?userId=${userId}`)
      .pipe(map(data => {
        return data;
      }));
  }

  GetVotesByUser(userId: string){
    return this.httpClient.get<VoteResponse[]>(`${environment.usersInteractionsApi}api/v1/VoteUser/GetVoteByUser/?userId=${userId}`)
      .pipe(map(data => {
        return data;
      }));
  }
  
}
