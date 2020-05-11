import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ForgotRequest } from 'src/app/model/Account';
import { UserRequest, UserResponse } from 'src/app/model/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private httpClient: HttpClient) { 
  }
  
  getById(id: string) {
    return this.httpClient.get<UserResponse>(`${environment.userApiUrl}api/v1/user/UserGetById?id=${id}`)
      .pipe(map(user => {
        return user;
      }));
  }

  forgotPassword(request: ForgotRequest) {
      return this.httpClient.post(`${environment.userApiUrl}api/v1/Account/ForgotPassword`, request);
  }

  UpdateUser(request: UserRequest) {
      return this.httpClient.put(`${environment.userApiUrl}api/v1/User/`, request);
  }

  UploadImage(request: FormData, id: string) {
      return this.httpClient.post(`${environment.userApiUrl}api/v1/UserImage/UploadFiles?userId=${id}`, request);
  }

  DeleteImage(id: string) {
      return this.httpClient.delete(`${environment.userApiUrl}api/v1/UserImage/DeleteImage?userId=${id}`);
  }
}
