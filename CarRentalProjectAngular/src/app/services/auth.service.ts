import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private authenticateBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  authAsObservable(): Observable<boolean>{
    return this.authenticateBehaviorSubject.asObservable();
  }

  login(){
    //we need some api logic here
    this.authenticateBehaviorSubject.next(true);
  }

  logout(){
    this.authenticateBehaviorSubject.next(false);
  }
}
