import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private jwtHelper: JwtHelperService) {}

    public getToken(): string {
      var retrievedObject = JSON.parse(localStorage.getItem('user'));
      return retrievedObject.token;
    }  
    
    public isAuthenticated(): boolean {
      const token = this.getToken();
      
        if (token) {
            return !this.jwtHelper.isTokenExpired(token);
        }
    }
}
