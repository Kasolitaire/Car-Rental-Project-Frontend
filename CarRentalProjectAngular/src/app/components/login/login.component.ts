import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginCredentials } from 'src/app/models/login-credentials';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  loginStatus$!: Observable<boolean>;
  loginCredentials: LoginCredentials = {
    loginId: '',
    password: '',
  };
  loginCredentialsForm!: FormGroup;

  ngOnInit(): void {
    this.loginStatus$ = this.authService.loginStatusAsObservable();
    //Form
    this.loginCredentialsForm = this.formBuilder.group({
      loginId: [this.loginCredentials.loginId, [Validators.required]],
      password: [this.loginCredentials.password, [Validators.required]],
    });
  }

  login(loginCredentials: LoginCredentials) {
    this.authService.loadUser(loginCredentials)
  }

  logout() {
    this.authService.logoutService();
  }
}
