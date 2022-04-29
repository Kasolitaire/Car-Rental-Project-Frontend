import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }
  private userSubject: Subject<User> = new Subject<User>();
  private authenticateBehaviorSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  authAsObservable(): Observable<boolean>{
    return this.authenticateBehaviorSubject$.asObservable();
  }

  login(){
    //we need some api logic here
    this.authenticateBehaviorSubject$.next(true);
  }

  logout(){
    this.authenticateBehaviorSubject$.next(false);
  }
}
