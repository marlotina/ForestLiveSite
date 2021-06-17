import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { ConfirmEmailRequest, ForgotRequest, User, ResetPasswordRequest } from '../../model/account'
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  userImageSubject = new BehaviorSubject<string>("");
  isLoggedSubject = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) { 
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
    if(this.userSubject.value != null){
      this.userImageSubject.next(this.userSubject.value.photo);
    }else{
      this.userImageSubject.next(null);
    }
     
    this.isLoggedSubject .next(localStorage.getItem('user') != null);
  }
  
  public get userValue(): User {
    if(this.userSubject.value != null){
      return this.userSubject.value;
    }
    return
  }

  SignUp(request) {
    return this.httpClient.post(`${environment.userApiUrl}api/v1/account/register`, request);
  }

  Login(request) {
    return this.httpClient.post<User>(`${environment.userApiUrl}api/v1/account/login`, request)
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('access_token', user.token);
        this.userSubject.next(user);
        this.isLoggedSubject.next(true);
        this.userImageSubject.next(user.photo);
        return user;
    }));
  }

  Logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    this.userSubject.next(null);
    this.userImageSubject.next("");
    this.isLoggedSubject.next(false);
  }

  
  userImageObservable() : Observable<string> {
    return this.userImageSubject.asObservable();
  }

  userLoggedObservable() : Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }


  ConfirmEmail(request: ConfirmEmailRequest) {
    return this.httpClient.post(`${environment.userApiUrl}api/v1/Account/ConfirmEmail`, request);
  }

  ForgotPassword(request: ForgotRequest) {
    return this.httpClient.post(`${environment.userApiUrl}api/v1/Account/ForgotPassword`, request);
  }
  
  ResetPassword(request: ResetPasswordRequest) {
    return this.httpClient.post(`${environment.userApiUrl}api/v1/Account/ResetPassword`, request);
  }

  updateImage(image: string){
      this.userImageSubject.next(image);
  }
}
