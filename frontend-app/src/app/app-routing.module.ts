import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthService} from './services/auth.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: './components/dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthService]
  },
  {
    path: 'login',
    loadChildren: './components/login/login.module#LoginModule'
  },
  {
    path: 'registration',
    loadChildren: './components/registration/registration.module#RegistrationModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
