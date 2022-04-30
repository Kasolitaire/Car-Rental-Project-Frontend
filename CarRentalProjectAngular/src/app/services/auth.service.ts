import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginCredentials } from '../models/login-credentials';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  private authenticateBehaviorSubject$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  authAsObservable(): Observable<boolean> {
    return this.authenticateBehaviorSubject$.asObservable();
  }

  loginService(loginCredentials: LoginCredentials) {
    this.authenticateBehaviorSubject$.next(true);
  }

  logoutService() {
    this.authenticateBehaviorSubject$.next(false);
  }
}
