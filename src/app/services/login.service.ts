import { Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class loginService {
  private data:boolean;

  getData():any{
    return this.data;
  }
  setData(data:any){
    this.data = data;
  }


}
