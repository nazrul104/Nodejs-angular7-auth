import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CanActivate} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  public myRawToken;
  isExpired: any;

  constructor(private router: Router, public jwtHelper: JwtHelperService) {
    if (localStorage.getItem('access_token')) {
      this.myRawToken = localStorage.getItem('access_token');
      this.isExpired = this.jwtHelper.isTokenExpired(this.myRawToken);
    }
  }

  canActivate() {
    if (this.jwtHelper.isTokenExpired(this.myRawToken) === false) {
      return true;
    } else {
      this.router.navigateByUrl('login');
      return false;
    }
  }

  isLoggedIn() {
    return this.isExpired;
  }
}
