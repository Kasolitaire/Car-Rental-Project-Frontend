import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService) {}
  loginStatus$!: Observable<boolean>;
  adminStatus$!: Observable<boolean>;
  employeeStatus$!: Observable<boolean>;
  ngOnInit(): void {
    this.loginStatus$ = this.authService.loginStatusAsObservable();
    this.adminStatus$ = this.authService.adminStatusAsObservable();
    this.employeeStatus$ = this.authService.employeeStatusAsObservable();
  }

  logout() {
    this.authService.logoutService();
  }
}
