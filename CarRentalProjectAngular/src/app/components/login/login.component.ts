import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  auth$!: Observable<boolean>;

  ngOnInit(): void {
    this.auth$ = this.authService.authAsObservable();
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}