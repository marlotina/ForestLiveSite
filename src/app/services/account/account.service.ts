import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import {ConfirmEmailRequest} from '../../model/Account'

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  constructor(private httpClient: HttpClient) { }
  
  SignUp(request) {
    return this.httpClient.post(`${environment.apiUrl}api/v1/account/register`, request);
  }

  Login(request) {
    return this.httpClient.post(`${environment.apiUrl}api/v1/account/login`, request);
  }

  ConfirmEmail(request: ConfirmEmailRequest) {
    return this.httpClient.post(`${environment.apiUrl}api/v1/Account/ConfirmEmail`, request);
  }
}
