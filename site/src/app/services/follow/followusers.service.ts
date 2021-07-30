import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { DeleteFollowUserResquest, FollowListResponse, FollowUserRequest, FollowUserResponse } from 'src/app/model/FollowUser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FollowusersService {

  constructor(private httpClient: HttpClient) { 
  }

  AddFollow(request: FollowUserRequest) {
    return this.httpClient.post<FollowUserResponse>(`${environment.usersInteractionsApi}api/v1/FollowUser/AddFollowUser`, request)
      .pipe(map(data => {
        return data;
      }));
  }

  DeleteFollow(request: DeleteFollowUserResquest){
    return this.httpClient.delete(`${environment.usersInteractionsApi}api/v1/FollowUser/DeleteFollowUser?followId=${request.followId}&followUserId=${request.followUserId}`)
      .pipe(map(data => {
        return data;
      }));
  }

  GetFollowerByUserId(userId: string){
    return this.httpClient.get<FollowListResponse[]>(`${environment.usersInteractionsApi}api/v1/FollowerUser/GetFollowerByUserId?userId=${userId}`)
      .pipe(map(data => {
        return data;
      }));
  }

  GetFollowByUserId(userId: string){
    return this.httpClient.get<FollowListResponse[]>(`${environment.usersInteractionsApi}api/v1/FollowUser/GetFollowByUserId?userId=${userId}`)
      .pipe(map(data => {
        return data;
      }));
  }
}
