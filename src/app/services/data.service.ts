import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  hostURL:string = "http://localhost:8080/NJIT";

  constructor(private http: HttpClient) { }

  getPersonAllData(): Observable<any>{
    return this.http.get("assets/personall.json");
    // return this.http.get(this.hostURL+"/personAll");
  }
  getPersonDetailData(ssn: any): Observable<any>{
    return this.http.get("assets/persondetail.json/");
    // return this.http.get(this.hostURL+"/personBySsn/"+ssn)
  }
  getPersonTypeData(): Observable<any>{
    return this.http.get("assets/persontype.json");
    // return this.http.get(this.hostURL+"/personTypes")
  }
  getPhoneTypeData(): Observable<any>{
    return this.http.get("assets/phonetype.json");
    // return this.http.get(this.hostURL+"/phoneTypes")
  }


  // personCreate(): Observable<any>{
  //   return this.http.get(this.hostURL+"/phoneTypes")
  // }

  // postPerson(formData: any): Observable<any>{
  //   return this.http.post(this.hostURL+"/savePerson", formData);
  // }   
}
