import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentTime: string = moment().format('MMMM Do YYYY, h:mm a');  

  constructor() { }

  ngOnInit(): void {
  }

}
