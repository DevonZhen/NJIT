import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestfulService } from './../services/restful.service';
import { loginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.LoginForm();

  }

  LoginForm(){
    this.loginForm=this.formBuilder.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get userId(){
    return this.loginForm.get('userId');
  }

  get password(){
    return this.loginForm.get('password');
  }

  storing(userId:any){
    localStorage.clear();
    //Stores in different keys
    localStorage.setItem('username', userId);
    let item = localStorage.getItem('username');
    // localStorage.setItem('password', password);

    //Stores in objects
    // let loginData = {'username': userId, 'password': password};
    // localStorage.setItem('loginInfo', JSON.stringify(loginData));

    // let item = JSON.parse(localStorage.getItem('loginInfo'));
    console.log("Login Credentials = "+JSON.stringify(item));
  }


  getPersonByUidandPwd(uid: any, pwd: any) {

    localStorage.setItem('login', 'true');
   
    this.router.navigateByUrl('header', { skipLocationChange: true }).then(() => {
      this.router.navigate(['personList']);
    }); 
  }

  onSubmit() {
    console.log("Login Form Values: "+JSON.stringify(this.loginForm.value));
    this.getPersonByUidandPwd(this.userId.value, this.password.value);
    
  }


}
