import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  constructor(
    private authService: AuthService,
    public router: Router,
  ) { }

  ngAfterViewInit() {

    // On aplication startup verify the localstorage with server & load user's info.
    this.authService.populate();

  }

}
