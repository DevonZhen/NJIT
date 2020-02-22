import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class DataService {


    hostURL:string = "http://localhost:8080/NJIT";

    constructor(private url: string, private http: HttpClient) { }

    getPersonAllData(): Observable<any>{
        //return this.http.get(this.url+"/personall.json");
        return this.http.get(this.hostURL+"/personAll");
      }

  }