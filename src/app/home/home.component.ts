import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // animations:[
  //   trigger('fade', [
  //     transition('void => *', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
  //     transition('* => void', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]),
  //   ])
  // ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  // current = 0;
  // img_list = [
  //   'assets/images/Building.jpg',
  //   'assets/images/Campus.jpg',
  //   'assets/images/Homecoming.jpg',
  // ];

  ngOnInit(){
    // setInterval(() => {
    //   this.current = ++this.current % this.img_list.length;
    // }, 2000);
  }

}
