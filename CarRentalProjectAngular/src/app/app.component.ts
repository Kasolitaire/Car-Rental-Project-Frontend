import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LoginCredentials } from './models/login-credentials';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  constructor(private authService: AuthService) {}

  ngOnInit(): void {

    const loginId = sessionStorage.getItem('loginId');
    const password = sessionStorage.getItem('password');

    if(loginId && password){
      const loginCredentials: LoginCredentials = {
        loginId: loginId,
        password: password
      }

      this.login(loginCredentials)
    }
  }

  login(loginCredentials: LoginCredentials){
    this.authService.loadUser(loginCredentials)
  }

}
