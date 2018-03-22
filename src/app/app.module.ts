import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GuestComponent } from './guest/guest.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';

import { DashboardResolver } from './dashboard/dashboard-resolver.service';
import { GuestResolver } from './guest/guest-resolver.service';


import {
  ApiService,
  AuthGuard,
  NoAuthGuard,
  SharedModule,
  JwtService,
  AuthService,
  InvitationService,
} from './shared';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    GuestComponent,
    LoginComponent,
    LogoutComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    AuthGuard,
    NoAuthGuard,
    JwtService,
    AuthService,
    InvitationService,
    DashboardResolver,
    GuestResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
