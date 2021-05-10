import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { DeleteFollowUserResquest, FollowUserRequest, FollowUserResponse } from 'src/app/model/FollowUser';
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

  GetUsersByKey(keys: string) {
    return this.httpClient.get<UserListResponse[]>(`${environment.userApiUrl}api/v1/userpage/GetUsersByKey?keys=${keys}`)
      .pipe(map(user => {
        return user;
      }));
  }

  AddFollow(request: FollowUserRequest) {
    return this.httpClient.post<FollowUserResponse>(`${environment.userInteractionsApi}api/v1/FollowUser/AddFollowUser`, request)
      .pipe(map(data => {
        return data;
      }));
  }

  DeleteFollow(request: DeleteFollowUserResquest){
    return this.httpClient.delete(`${environment.userInteractionsApi}api/v1/FollowUser/DeleteFollowUser?followId=${request.followId}&followUserId=${request.followUserId}&userSystemId=${request.userSystemId}`)
      .pipe(map(data => {
        return data;
      }));
  }
}

/*
userId: string;
    followUserId: string;
    userSystemId: string;
*/