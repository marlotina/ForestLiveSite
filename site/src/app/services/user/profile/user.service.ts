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
  
  GetById(id: string) {
    return this.httpClient.get<UserResponse>(`${environment.userApiUrl}api/v1/user/UserGetById?id=${id}`)
      .pipe(map(user => {
        return user;
      }));
  }

  ForgotPassword(request: ForgotRequest) {
      return this.httpClient.post(`${environment.userApiUrl}api/v1/Account/ForgotPassword`, request);
  }

  UpdateUser(request: UserRequest) {
      return this.httpClient.put(`${environment.userApiUrl}api/v1/usermanaged/`, request);
  }

  UploadImage(request: ImageProfileRequest) {
      return this.httpClient.post(`${environment.userApiUrl}api/v1/UserImage/UploadFiles`, request);
  }

  DeleteImage(id: string) {
      return this.httpClient.delete(`${environment.userApiUrl}api/v1/UserImage/DeleteImage?userId=${id}`);
  }

  DeleteUser(id: string) {
    return this.httpClient.delete(`${environment.userApiUrl}api/v1/usermanaged?userId=${id}`);
  }
}
