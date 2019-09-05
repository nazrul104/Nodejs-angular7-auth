import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatSnackBarModule,
  MatProgressBarModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule, MatFormFieldModule, MatButtonModule, MatCheckboxModule, MatCardModule, MatSnackBarModule, MatProgressBarModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule {
}
