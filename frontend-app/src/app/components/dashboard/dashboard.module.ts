import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {MatInputModule, MatFormFieldModule, MatButtonModule, MatCheckboxModule, MatCardModule, MatAutocompleteModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule, MatFormFieldModule, MatButtonModule, MatCheckboxModule, MatCardModule, MatAutocompleteModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule {
}
