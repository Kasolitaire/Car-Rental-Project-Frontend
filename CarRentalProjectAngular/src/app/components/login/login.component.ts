import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
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
    private formBuilder: FormBuilder,
    private router: Router
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

  async login(loginCredentials: LoginCredentials) {
    await this.authService.loadUser(loginCredentials)
    const loginStatus: boolean = await firstValueFrom(this.loginStatus$);
    if(loginStatus){
      this.router.navigate(['/', 'browse']);
    }
    else{
      alert('Wrong Credentials')
    }
  }
}
