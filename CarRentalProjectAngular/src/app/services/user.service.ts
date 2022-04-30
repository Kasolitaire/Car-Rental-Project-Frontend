import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginCredentials } from '../models/login-credentials';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {
    this.serverURL = environment.serverURL;
  }
  //Should be public
  public user: User | null = null;
  private serverURL: string;

  getUser(loginCredentials: LoginCredentials) {
    this.httpClient
      .get<User>(
        `${this.serverURL}Login/${loginCredentials.loginId},${loginCredentials.password}`
      )
      .subscribe((user) => this.user = user);
  }
}
