import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable, ReplaySubject } from 'rxjs';
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
  //Server URL from environment
  serverURL: string;

  //Emits any user retrieved
  private userReplay: ReplaySubject<User> = new ReplaySubject<User>(1);

  //  Emits a boolean value stating that a user is logged in
  private userLoginStatus$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  //  Emits a boolean value stating that an admin is logged in
  private adminLoginStatus$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  //  Emits a boolean value stating that an employee is logged in
  private employeeLoginStatus$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  async loadUser(loginCredentials: LoginCredentials) {
    const user$: Observable<User> = this.httpClient.get<User>(
      `${this.serverURL}Login/${loginCredentials.loginId},${loginCredentials.password}`
    );

    try {
      const user: User = await firstValueFrom(user$.pipe());
      this.userReplay.next(user);
      this.userLoginStatus$.next(true);
      this.roleCheck(user);
    } catch (error) {
      //Needs to be more meaningful
      console.log((error as HttpErrorResponse).status);
    }
    // this.httpClient.post("google.com", {} ).subscribe(t => { this.RegistrationComplete = (t as boolean); } )
  }

  //  Checks if the user is an admin or employee
  roleCheck(user: User) {
    if (user.userRole == 'admin') {
      this.adminLoginStatus$.next(true);
      this.employeeLoginStatus$.next(true);
    }

    if (user.userRole == 'employee') {
      this.employeeLoginStatus$.next(true);
    }
  }

  userAsObservable(): Observable<User>{
    return this.userReplay.asObservable();
  }

  //  Returns an Observable of user login status
  loginStatusAsObservable(): Observable<boolean> {
    return this.userLoginStatus$.asObservable();
  }

  //  Return an Observable of admin login status
  adminStatusAsObservable(): Observable<boolean> {
    return this.adminLoginStatus$.asObservable();
  }

  //  Return an Observable of employee login status
  employeeStatusAsObservable(): Observable<boolean> {
    return this.employeeLoginStatus$.asObservable();
  }

  //  Logs any user out of the system
  logoutService() {
    this.userLoginStatus$.next(false);
    this.adminLoginStatus$.next(false);
    //  Might need further implementation
  }
}
