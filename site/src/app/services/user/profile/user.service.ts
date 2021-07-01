import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ForgotRequest } from 'src/app/model/account';
import { UserRequest, UserResponse, ImageProfileRequest, UserInfoResponse } from 'src/app/model/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { 
  }
  
  GetByUserId(id: string) {
    return this.httpClient.get<UserResponse>(`${environment.userApiUrl}api/v1/manageuser/GetUserProfile?userId=${id}`)
      .pipe(map(user => {
        return user;
      }));
  }

  ForgotPassword(request: ForgotRequest) {
      return this.httpClient.post(`${environment.userApiUrl}api/v1/Account/ForgotPassword`, request);
  }

  UpdateUser(request: UserRequest) {
      return this.httpClient.put(`${environment.userApiUrl}api/v1/ManageUser/`, request);
  }

  UploadImage(request: ImageProfileRequest) {
      return this.httpClient.post(`${environment.userApiUrl}api/v1/ManageUserImage/UploadFiles`, request);
  }

  DeleteImage(id: string, imageName: string) {
      return this.httpClient.delete(`${environment.userApiUrl}api/v1/ManageUserImage/DeleteImage?userId=${id}&imageName=${imageName}`);
  }

  DeleteUser(id: string) {
    return this.httpClient.delete(`${environment.userApiUrl}api/v1/usermanaged?userId=${id}`);
  }
}
