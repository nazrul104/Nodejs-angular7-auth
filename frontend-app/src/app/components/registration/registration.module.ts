import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegistrationRoutingModule} from './registration-routing.module';
import {RegistrationComponent} from './registration.component';
import {
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatSnackBarModule
} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule, MatFormFieldModule, MatButtonModule, MatCheckboxModule, MatCardModule, MatSnackBarModule
  ],
  declarations: [RegistrationComponent]
})
export class RegistrationModule {
}
