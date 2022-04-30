import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginCredentials } from 'src/app/models/login-credentials';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  auth$!: Observable<boolean>;
  loginCredentials: LoginCredentials = {
    loginId: '',
    password: '',
  };
  loginCredentialsForm!: FormGroup;

  ngOnInit(): void {

    this.auth$ = this.authService.authAsObservable();
    //Form
    this.loginCredentialsForm = this.formBuilder.group({
      loginId: [this.loginCredentials.loginId, [Validators.required]],
      password: [this.loginCredentials.password, [Validators.required]],
    });
  }

  login(loginCredentials: LoginCredentials) {
    this.userService.getUser(loginCredentials)
    if (this.userService.user != null) {
      this.authService.loginService();
    }
    else {
      //not sure what goes here (tell user that credentials are wrong)
    }
  }

  logout() {
    this.authService.logoutService();
    //not amazing this field should be private
    this.userService.user = null;
  }
}
