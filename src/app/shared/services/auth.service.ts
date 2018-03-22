import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';
// tslint:disable-next-line:import-blacklist
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable()
export class AuthService {

  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private router: Router,
    private jwtService: JwtService
  ) { }

  populate() {
    if (this.jwtService.getToken()) {
      this.apiService.get('/me')
        .subscribe(
          data => { this.setAuth(data); },
          err => this.purgeAuth()
        );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: User) {

    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);

    // Set current user data into observable
    this.currentUserSubject.next(user);

    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);

  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();

    // Set current user to an empty object
    this.currentUserSubject.next(new User());

    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(credentials): Observable<User> {
    return this.apiService.post('/login', { user: credentials })
      .map(
        data => {
          this.setAuth(data);
          return data;
        }
      );
  }

}
