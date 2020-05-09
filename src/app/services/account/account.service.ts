import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  constructor(private httpClient: HttpClient) { }
  
  SignUp(request) {
    return this.httpClient.post(`${environment.apiUrl}api/v1/Account/Register`, request);
  }
 
}
