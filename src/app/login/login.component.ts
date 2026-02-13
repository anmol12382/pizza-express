import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  profileForm = new FormGroup({
    name :new FormControl('',[Validators.required]),
    password :new FormControl('',[Validators.required, Validators.minLength(5)]),
    email :new FormControl('',[Validators.required, Validators.maxLength(50), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
  })

  submitData(){
    console.log(this.profileForm.value);
  }

  get name(){
    return this.profileForm.get('name');
  }
  get email(){
    return this.profileForm.get('email');
  }
  get password(){
    return this.profileForm.get('password');
  }

}
