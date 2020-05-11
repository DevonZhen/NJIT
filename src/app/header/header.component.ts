import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { loginService } from '../services/login.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentTime: string = moment().format('MMMM Do YYYY, h:mm a');  
  public visibility:boolean = true;
  data:any;
  
  constructor(private ls: loginService) { 
    // this.ls.setData(false);
  }

  ngOnInit(): void {
    
    this.data = this.ls.getData();
  }


}
