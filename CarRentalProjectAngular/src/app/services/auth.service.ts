import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginCredentials } from '../models/login-credentials';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {
    this.serverURL = environment.serverURL;
  }
  serverURL: string;
  private userSubject$: Subject<User> = new Subject<User>();

  private userLoginStatus$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private adminLoginStatus$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  async loadUser(loginCredentials: LoginCredentials) {
    const user$: Observable<User> = this.httpClient.get<User>(
      `${this.serverURL}Login/${loginCredentials.loginId},${loginCredentials.password}`
    );

    try {
      const user: User = await firstValueFrom(user$);
      this.userSubject$.next(user);
      this.userLoginStatus$.next(true);
      this.adminCheck(user);
    } catch (error) {
      console.log((error as HttpErrorResponse).status);
      //Needs to be more meaningful
    }
    // this.httpClient.post("google.com", {} ).subscribe(t => { this.RegistrationComplete = (t as boolean); } )
  }

  adminCheck(user: User) {
    if (user.userRole == 'admin') {
      this.adminLoginStatus$.next(true);
    }
  }

  loginStatusAsObservable(): Observable<boolean> {
    return this.userLoginStatus$.asObservable();
  }

  adminStatusAsObservable(): Observable<boolean> {
    return this.adminLoginStatus$.asObservable();
  }

  logoutService() {
    this.userLoginStatus$.next(false);
    this.adminLoginStatus$.next(false);
    //Might need further implementation
  }
}
