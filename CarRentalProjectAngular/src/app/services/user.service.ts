import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginCredentials } from '../models/login-credentials';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
    this.serverURL = environment.serverURL;
  }
  
  private serverURL: string;
  private userObservable$!: Observable<User>

  returnUserObservable(){
    return this.userObservable$;
  }

  getUserObservable(loginCredentials: LoginCredentials){
    this.userObservable$ = this.httpClient.get<User>(
      `${this.serverURL}Login/${loginCredentials.loginId},${loginCredentials.password}`
    );
  }
}
