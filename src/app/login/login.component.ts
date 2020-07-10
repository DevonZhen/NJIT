import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestfulService } from './../services/restful.service';
import { loginService } from '../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedDataService } from './../services/shared-data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private restService: RestfulService,
    private snack: MatSnackBar,
    private sharedData: SharedDataService
    ) { }

  ngOnInit(): void {
    this.LoginForm();
    this.loadForm();
  }

  LoginForm(){
    this.loginForm=this.formBuilder.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loadForm(){
    this.loginForm.setValue({
      userId: "JIMMY03",
      password: "jimmy123"
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

    // localStorage.setItem('login', 'true');
   
    // this.router.navigateByUrl('header', { skipLocationChange: true }).then(() => {
    //   this.router.navigate(['personList']);
    // }); 
    this.restService.getPersonByUidandPwd(uid, pwd)
    .subscribe(
      data => { 
        console.log("data=="+JSON.stringify(data));
        if (data.ssn === null || data.ssn ===""){
            console.log("Login Failed")
            this.snack.open("Login Failed",'',{duration: 5000, panelClass: ['mat-toolbar', 'mat-warn']});
        }
        else {
            sessionStorage.setItem("account", 'true');
            this.sharedData.loginStatus.next('true');
            this.router.navigate(['personList']);
        }
      },
      err => {
        console.log("Error occured: getPersonByUidandPwd()")
      }
    );
  }

  onSubmit() {
    console.log("Login Form Values: "+JSON.stringify(this.loginForm.value));
    this.getPersonByUidandPwd(this.userId.value, this.password.value);
    
  }


}
