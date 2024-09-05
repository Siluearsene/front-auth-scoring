import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { SaisirComponent } from './saisir/saisir.component';
import { ResultPopupComponent } from './result-popup/result-popup.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashbaordComponent },
  { path: 'resultpop', component: ResultPopupComponent },
  { path: 'saisir', component: SaisirComponent }
];
