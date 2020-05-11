import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { MatTableDataSource } from '@angular/material/table';
import { RestfulService } from './../services/restful.service';

//Static
// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }
//Static
// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

export interface PERSON_TYPE {
  id: number;
  type: string;
}

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  personTypes: PERSON_TYPE[];

  constructor(private router: Router, private route: ActivatedRoute, private restService: RestfulService) { }
  // constructor() { }

  ngOnInit() {
    this.getPersonAll();
    this.getPersonTypes();
  }

  // //Static
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);

  //Define the table's column names
  displayedColumns: string[] = ['firstName','lastName','ssn','birthDay','personType','phone','delete'];
  dataSource = new MatTableDataSource();

  getPersonAll() {
    console.log("(Person List) Starts Here");
    this.restService.getPersonAllData()
    .subscribe(
      data => { 
        this.dataSource.data = data;
        console.log("(Person List) Data: "+JSON.stringify(data));
      },
      err => {
        console.log("Error occured: getPersonAll()")
      }
    );
  }

  getPersonTypes() {
    this.restService.getPersonTypeData()
    .subscribe(
      data => { 
        this.personTypes = data;
        console.log("(Person List) data =="+ JSON.stringify(data))
      },
      err => {
        console.log("Error occured: getPersonType()" + err)
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }  


  onClickDelete(id: string) {
    console.log("delete id: "+id)
    this.restService.deletePerson(id)
    .subscribe(
      data => { 
        this.getPersonAll();
        this.getPersonTypes();
      },
      err => {
        console.log("Error occured: getPersonDeital()" + err)
      }
    );
  }

  //Static's Filter
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
}

