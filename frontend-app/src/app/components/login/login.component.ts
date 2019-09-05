import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {HttpService} from '../../services/http.service';
import {AuthService} from '../../services/auth.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  isLoading: any;
  public emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private fb: FormBuilder,
              private router: Router, private http: HttpService, private auth: AuthService,
              private snackBar: MatSnackBar) {
    this.myForm = fb.group({
      email: ['', [Validators.required, <any>Validators.pattern(this.emailRegex)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.isLoading = false;
    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/');
    }
  }

  loginAuth() {
    this.isLoading = true;
    this.http.loginService(this.myForm.value).subscribe(res => {
      if (res && res.status) {
        /*SET AUTH TOKEN INTO LOCALSTORAGE*/
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('user', JSON.stringify(res.data));
        /*SHOW LOADING*/
        setTimeout(() => {
          this.isLoading = false;
          this.router.navigateByUrl('/');
        }, 3000);

      } else {
        this.snackBar.open(res.msg, 'Undo', {
          duration: 3000
        });
      }
    }, () => {
      this.snackBar.open('Something wen wrong! plz check', 'Undo', {
        duration: 3000
      });
    });
  }
}
