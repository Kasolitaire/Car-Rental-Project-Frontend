import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first, firstValueFrom, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.createUpdateForm();
    this.getUsers();
  }

  private serverURL: string = environment.serverURL;
  public showForm: boolean = false;
  users$!: Observable<User[]>;
  public maxDate: Date = new Date();
  public updateForm!: FormGroup;

  private userUpdateDetails: User = {
    userId: 0,
    userRole: '',
    fullName: '',
    id: '',
    username: '',
    birthDate: '',
    gender: '',
    email: '',
    password: '',
  };

   getUsers(){
    const response$ = this.httpClient.get<User[]>(`${this.serverURL}Admin/users`);
    this.users$ = response$;
  }

  async deleteUser(user: User){
     if(confirm('Are you sure you wanna delete this user?')){
      const response$ = this.httpClient.delete(`${this.serverURL}Admin/DeleteUser,${user.userId}`);
      await firstValueFrom(response$);
      this.getUsers();
     }
  }

  async updateUser(){
    const originalDate = this.userUpdateDetails.birthDate;
    this.userUpdateDetails = this.updateForm.value;
    if(this.userUpdateDetails.birthDate == ''){
      this.userUpdateDetails.birthDate = originalDate;
    }
    else{
      this.userUpdateDetails.birthDate = new Date(this.updateForm.value.birthDate).toLocaleDateString('en-US')
    }
    try {
      const response$ = this.httpClient.put(`${this.serverURL}Admin/UpdateUser`, this.userUpdateDetails);
      await firstValueFrom(response$);
    }
    catch (error) {
      alert((error as HttpErrorResponse).error);
    }

    this.getUsers();
  }

  defaultDetails(user: User){
    this.userUpdateDetails = user
    this.createUpdateForm();
    this.showForm = true;
  }

  createUpdateForm(){
    this.updateForm = this.formBuilder.group({
      userId: [this.userUpdateDetails.userId],
      userRole: [this.userUpdateDetails.userRole],
      fullName: [this.userUpdateDetails.fullName, [Validators.maxLength(50)]],
      id: [this.userUpdateDetails.id, [Validators.maxLength(9), Validators.minLength(9), this.onlyNumbersValidation]],
      username: [this.userUpdateDetails.username, [Validators.maxLength(50)]],
      birthDate: '',
      gender: [this.userUpdateDetails.gender],
      email: [this.userUpdateDetails.email, [Validators.maxLength(50), Validators.email]],
      password: [this.userUpdateDetails.password, [Validators.maxLength(50)]],
    });
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
