import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from '../shared';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  isSubmitting = false;
  showError = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });

  }

  ngOnInit() {
  }

  submitForm() {
    this.isSubmitting = true;

    const credentials = this.form.value;
    this.authService
      .attemptAuth(credentials)
      .subscribe(
        data => {
          console.log(data);
          if ( !data ) {
            this.showError = true;
          } else {
            this.router.navigateByUrl('/');
          }
          this.isSubmitting = false;
        },
        err => {
          this.isSubmitting = false;
        }
      );
  }

}
