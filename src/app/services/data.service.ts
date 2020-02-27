import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  hostURL:string = "http://localhost:8080/NJIT";

  constructor(private http: HttpClient) { }

  //Collects Data from JSON <personall> or from DB
  getPersonAllData(): Observable<any>{
    return this.http.get("assets/personall.json");
    // return this.http.get(this.hostURL+"/personAll");
  }

  //Collects Data from JSON <persondetail> or from DB
  getPersonDetailData(ssn: any): Observable<any>{
    return this.http.get("assets/persondetail.json/");
    // return this.http.get(this.hostURL+"/personBySsn/"+ssn)
  }

  //Collects Data from JSON <persontype> or from DB
  getPersonTypeData(): Observable<any>{
    return this.http.get("assets/persontype.json");
    // return this.http.get(this.hostURL+"/personTypes")
  }

  //Collects Data from JSON <phonetype> or from DB
  getPhoneTypeData(): Observable<any>{
    return this.http.get("assets/phonetype.json");
    // return this.http.get(this.hostURL+"/phoneTypes")
  }

}
