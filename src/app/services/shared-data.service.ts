import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  accountStatus:BehaviorSubject<boolean>;
  loginStatus:BehaviorSubject<string>;
  
  constructor() {
    this.accountStatus = new BehaviorSubject(null);
    this.loginStatus = new BehaviorSubject('');
   }

}
