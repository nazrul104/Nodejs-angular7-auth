import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {HttpService} from '../../services/http.service';
import {PasswordValidation} from '../../password-validation';
import {MatSnackBar} from '@angular/material';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  myForm: FormGroup;
  responseData: any;
  public emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private fb: FormBuilder,
              private router: Router,
              private http: HttpService,
              private auth: AuthService,
              private snackBar: MatSnackBar) {
    this.responseData = {};
    this.myForm = fb.group({
      name: ['', [Validators.required, Validators.maxLength(34), Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [Validators.required, <any> Validators.pattern(this.emailRegex)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validator: PasswordValidation.MatchPassword // your validation method
    });
  }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/');
    }
  }

  submitRegistrationForm() {
    this.http.registrationService(this.myForm.value).subscribe(res => {
      if (res && res.status) {
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('user', JSON.stringify(res.data));
        this.router.navigateByUrl('/');
      } else {
        this.snackBar.open(res.msg, 'Undo', {
          duration: 3000
        });
      }
    });
  }
}
