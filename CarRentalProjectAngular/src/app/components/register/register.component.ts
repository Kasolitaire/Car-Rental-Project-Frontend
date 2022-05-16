import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  public maxDate: Date = new Date();
  public registerForm!: FormGroup;

  private serverURL: string = environment.serverURL;

  private registerDetails: User = {
    fullName: '',
    id: '',
    username: '',
    birthDate: '',
    gender: '',
    email: '',
    password: '',
  };

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      fullName: [this.registerDetails.fullName, [Validators.required, Validators.maxLength(50)]],
      id: [this.registerDetails.id, [Validators.required, Validators.maxLength(9), Validators.minLength(9), this.onlyNumbersValidation]],
      username: [this.registerDetails.username, [Validators.required, Validators.maxLength(50)]],
      birthDate: this.registerDetails.birthDate,
      gender: [this.registerDetails.gender, [Validators.required]],
      email: [this.registerDetails.email, [Validators.required, Validators.maxLength(50), Validators.email]],
      password: [this.registerDetails.password, [Validators.required, Validators.maxLength(50)]],
    });
  }

  async registerUser(){
    if(!this.registerForm.valid) return;

    this.registerDetails = this.registerForm.value;
    this.registerDetails.birthDate = new Date(this.registerDetails.birthDate as string).toLocaleDateString('en-US')
    try {
      const response$ = this.httpClient.post(`${this.serverURL}SignUp/PostNewUser`, this.registerDetails);
      console.log(await firstValueFrom(response$));
      alert('Registration Complete')
      this.navigateToLogin();
    }
    catch (error) {

      if ((error as HttpErrorResponse).error == 'User with same email or user-name already exists') {
        alert((error as HttpErrorResponse).error);
      }
      else{
        alert('Something went wrong')
      }
    }
  }

  navigateToLogin(){
    this.router.navigate(['/', 'login'])
  }

  onlyNumbersValidation(control: FormControl): ValidationErrors | null{
    const currentIdValue: string = control.value;
    const isNumber: boolean = Array.from(currentIdValue).every((currentIdValue) => '0123456789'.includes(currentIdValue));
    if(isNumber){
      return null;
    }
    else{
      return {onlyNumbersValidation: 'Only numbers are allowed'}
    }
  }

}
