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
  helper = new JwtHelperService();

  constructor(private router: Router) {
    this.isExpired = false;
    if (localStorage.getItem('access_token')) {
      this.myRawToken = localStorage.getItem('access_token');
      this.isExpired = this.helper.isTokenExpired(this.myRawToken);
    }
  }

  canActivate() {
    if (this.helper.isTokenExpired(this.myRawToken) === false) {
      return true;
    } else {
      this.router.navigateByUrl('login');
      return false;
    }
  }

  isLoggedIn() {
    return this.isExpired === false ? true : false;
  }
}
