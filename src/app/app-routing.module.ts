import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { GuestComponent } from './guest/guest.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { GuestResolver } from './guest/guest-resolver.service';
import { DashboardResolver } from './dashboard/dashboard-resolver.service';
import { AuthGuard, NoAuthGuard } from './shared';

const routes: Routes = [
  {
    path: '', redirectTo: '/dashboard', pathMatch: 'full',
    canActivate: [AuthGuard],
    resolve: { invitation: GuestResolver },
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [ AuthGuard ], 
    resolve: { invitations: DashboardResolver },
  },
  { path: 'guest/:id', component: GuestComponent, resolve: { invitation: GuestResolver }, },
  { path: 'login', component: LoginComponent, canActivate: [ NoAuthGuard ] },
  { path: 'logout', component: LogoutComponent, canActivate: [ AuthGuard ] },
  { path: '**', redirectTo: '/dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
