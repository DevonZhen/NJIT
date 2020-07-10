import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { loginService } from '../services/login.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SharedDataService } from './../services/shared-data.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentTime: string = moment().format('MMMM Do YYYY, h:mm a');  
  public visibility:boolean = true;
  data:any;
  display:any;
  constructor(private ls: loginService,
    private route: Router,
    private sharedData: SharedDataService) { 
    // this.ls.setData(false);
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('account') === 'true')
    this.display=true;
    if(sessionStorage.getItem('account') === 'false')
    this.display=false;

    this.sharedData.loginStatus.subscribe(status =>{
      // alert("Hello: "+status);
      if(status!=''){
        sessionStorage.setItem("login",status);
        if(status === 'true')
          // console.log("loginStatus111: "+status)
          this.display=true;
        if(status === 'false')
          // console.log("loginStatus: "+status)
          this.display=false;
      }
    });



    this.data = this.ls.getData();
  }


  signout(){
    console.log("Sign Out");
    sessionStorage.clear();
    this.sharedData.loginStatus.next('false');
    this.route.navigate(['']);
  }

}
