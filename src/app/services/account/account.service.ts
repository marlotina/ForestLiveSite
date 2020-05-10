import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { ConfirmEmailRequest, ForgotRequest, User } from '../../model/Account'
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private httpClient: HttpClient) { 
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }
  
  public get userValue(): User {
    return this.userSubject.value;
  }

  SignUp(request) {
    return this.httpClient.post(`${environment.apiUrl}api/v1/account/register`, request);
  }

  Login(request) {
    return this.httpClient.post<User>(`${environment.apiUrl}api/v1/account/login`, request)
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
    }));
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  ConfirmEmail(request: ConfirmEmailRequest) {
    return this.httpClient.post(`${environment.apiUrl}api/v1/Account/ConfirmEmail`, request);
  }

  ForgotPassword(request: ForgotRequest) {
    return this.httpClient.post(`${environment.apiUrl}api/v1/Account/ForgotPassword`, request);
  }
  
}
