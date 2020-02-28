import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { RestfulService } from './../services/restful.service'
import { matchValues } from './../../directives/match-values'

export interface PERSON_TYPE {
  id: number;
  type: string;
}
export interface PHONE_TYPE {
  id: number;
  type: string;
}

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {

  updateFlag:boolean = false;

  personTypes: PERSON_TYPE[];
  phoneTypes: PHONE_TYPE[];
  detailForm: FormGroup;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,private restService: RestfulService) { }

  ngOnInit(): void {
    console.log("Start Here!");
    this.buildDetailForm()
    console.log("SSN: "+this.getSSN())
    this.getPersonType()
    this.getPhoneType()
    // if (this.getSSN() != null) {
    //     this.getPersonDetail(this.getSSN());
    //     this.updateFlag=true;
    // }
  }

  buildDetailForm() {
    this.detailForm = this.formBuilder.group({
      userId: this.formBuilder.control('',[Validators.required]),
      password: this.formBuilder.control('',[Validators.required]),
      confirmPassword: this.formBuilder.control('',[matchValues('password')]),
      personType: this.formBuilder.control(''),
      firstName: this.formBuilder.control(''),
      lastName: this.formBuilder.control(''),
      ssn: this.formBuilder.control('', [Validators.required]),
      birthday: this.formBuilder.control(''),
      datepicker: this.formBuilder.control(''),
      contactName: this.formBuilder.control(''),
      contactRelation: this.formBuilder.control(''),
      contactPhone: this.formBuilder.control(''),
      contactEmail: this.formBuilder.control('', [Validators.required]),
      phone: this.formBuilder.control(''), //temp
      phoneType: this.formBuilder.control(''), //temp
      phoneArray: this.constructPhoneArray()
    });
  }

  //Retrieves data from the reactive form holding
  get userId() {
    return this.detailForm.get('userId');
  }
  get password() {
    return this.detailForm.get('password');
  }
  get confirmPassword() {
     return this.detailForm.get('confirmPassword');
  }
  get birthDay() {
    return this.detailForm.get('birthDay');
  }
  get ssn() {
    return this.detailForm.get('ssn');
  }
  get contactEmail() {
    return this.detailForm.get('contactEmail');
  }
  constructPhoneArray() {
  }
  
  //Loads the JSON/Dynamic data from Restful <All Data?
  getPersonDetail(id: any){
    this.restService.getPersonDetailData(id)
    .subscribe(
      data => { 
        this.loadDetailForm(data);
      },
      err => {
        console.log("Error occured: getPersonDeital()")
      }
    );
  }

   //Loads the JSON/Dynamic data from Restful <Person Type>
   getPersonType(){
    this.restService.getPersonTypeData()
    .subscribe(
      data => { 
        this.personTypes = data;
      },
      err => {
        console.log("Error occured: personType() failed")
      }
    );
  }

  //Loads the JSON/Dynamic data from Restful <Phone Type>
  getPhoneType() {
    this.restService.getPhoneTypeData()
    .subscribe(
      data => { 
        this.phoneTypes = data;
      },
      err => {
        console.log("Error occured: phoneType() failed")
      }
    );
  }

  loadDetailForm(data: any) {
    //Initial Detail Fields
    this.detailForm.patchValue({
      'userId': data.userId,
      'password': data.password,
      'confirmPassword': data.password,
      'personType': data.personType.type,
      'firstName': data.firstName,
      'lastName': data.lastName,
      'ssn': data.ssn,
      'birthday': data.birthDay,
      'contactName': data.emgContact.ctName,
      'contactRelation': data.emgContact.ctRelation,
      'contactPhone': data.emgContact.ctPhone,
      'contactEmail': data.emgContact.ctEmail
    });
    data.phones.forEach(item => {
      const phone = this.formBuilder.group({ 
        'phone': item.phone,
        'phoneType': item.phoneType.type,
      })
      this.phones.push(phone);
    });
  }

  //Getting SSN from the Person List page
  getSSN(){
    return this.route.snapshot.paramMap.get('ssn');
  }



  //Converts datepicker into normal input (2 inputs overlaying)
  onDateChange(event: any, component: any) {
    this.detailForm.get(component).setValue(formatDate(event.target.value, 'MM/dd/yyyy', 'en-US'));
  }  

  //Basic Syntax example for getting data from form
  // get firstName() {
  //   return this.detailForm.get('firstName');
  // }

 /*-------------------
  Adding Phone 
  --------------------*/

  get phones() {
    return this.detailForm.get('phoneArray') as FormArray
  }

  //Adds Phone & Phone Type below
  addPhone() {
    const phone = this.formBuilder.group({ 
      phone: [],
      phoneType: [],
    })
    this.phones.push(phone);
  }

  //Delets specific row with Phone & Phone Type
  delPhone(i: any) {
    this.phones.removeAt(i);
  }


  onSubmit() {
    //Display Reactive Form's JSON Values
    console.log("Form Data: "+JSON.stringify(this.detailForm.value));

  }
}
