import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IAccountservices } from './iaccountservices';
import { SignUp, RequestAccount } from '../../model/Account';

@Injectable({
  providedIn: 'root'
})

export class AccountService implements IAccountservices {

  constructor(private httpClient: HttpClient) { }
  
  SignUp(request: SignUp): RequestAccount {
    var response: RequestAccount;

    this.httpClient.post(`https://localhost:44374/api/v1/Account/Register`, request)
      .subscribe(
        data => {
            response.Status = true;
        },
        error => {
            response.Status = false;
        });

      return response;
  }
 
}
