import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router ) {}

  auth$!: Observable<boolean>;
  redirectURL!: string;
  ngOnInit(): void {
    this.auth$ = this.authService.authAsObservable();
    this.activatedRoute.queryParams.subscribe(queryString => {this.redirectURL = queryString['redirectURL'];})
  }

  login() {
    this.authService.login();
    if (this.redirectURL) {
      this.router.navigateByUrl(this.redirectURL)
    }
  }

  logout() {
    this.authService.logout();
  }
}