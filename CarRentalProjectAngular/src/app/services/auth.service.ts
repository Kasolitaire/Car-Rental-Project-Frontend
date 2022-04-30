import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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

  loginService() {
    this.authenticateBehaviorSubject$.next(true);
  }

  logoutService() {
    this.authenticateBehaviorSubject$.next(false);
  }
}
