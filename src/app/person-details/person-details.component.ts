import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RxFormBuilder,FormGroupExtension } from '@rxweb/reactive-form-validators';
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

  constructor(private route: ActivatedRoute,
              private formBuilder: RxFormBuilder,
              private snackBar: MatSnackBar,
              private restService: RestfulService) { }

  ngOnInit(): void {
    console.log("(Person Details) Starts Here!");
    this.buildDetailForm()
    console.log("(Person Details) SSN: "+this.getSSN())
    this.getPersonType()
    this.getPhoneType()
    //If SSN is there, load data into Details Form
    if (this.getSSN() != null) {
        this.getPersonDetail(this.getSSN());
        this.updateFlag=true;
    }
    
  }

/*Old Syntax
  
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

      street: this.formBuilder.control(''),
      city: this.formBuilder.control(''),
      state: this.formBuilder.control(''),
      zip: this.formBuilder.control(''),
      
      datepicker: this.formBuilder.control(''),
      contactName: this.formBuilder.control(''),
      contactRelation: this.formBuilder.control(''),
      contactPhone: this.formBuilder.control(''),
      contactEmail: this.formBuilder.control(''),
      // phone: this.formBuilder.control(''), //temp
      // phoneType: this.formBuilder.control(''), //temp
      phoneArray: this.constructPhoneArray()
    });
  }

  Better Syntax (Using FormControl)
  buildDetailForm(){
    this.detailForm =new FormGroup({
      userId: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', matchValues('password')),
      personType: new FormControl('', Validators.required),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      ssn: new FormControl('', Validators.required),
      birthday: new FormControl(''),
      datepicker: new FormControl(''),
      address:new FormGroup({
        street: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl(''),
        zip: new FormControl(''),
      }),
      contactName:new FormControl(''),
      contactRelation: new FormControl(''),
      contactPhone: new FormControl(''),
      contactEmail: new FormControl(''),
      phoneArray: this.constructPhoneArray()
    });
  }
  */

  //Updated Syntax for Angular 8/9 (Using FormBuilder)
  buildDetailForm(){
    this.detailForm = this.formBuilder.group({
      id: [''],
      userId: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', matchValues('password')],
      pertId: [''],
      firstName: [''],
      lastName: [''],
      ssn: ['', Validators.required],
      birthDay: [new Date()],
      address: this.formBuilder.group({
        id: [''],
        street: [''],
        city: [''],
        state: [''],
        zip: [''],
      }),
      emgContact: this.formBuilder.group({
        id: [''],
        contactName: [''],
        contactRelation: [''],
        contactPhone: [''],
        contactEmail: ['',[Validators.email]],
      }),
      phones: this.constructPhoneArray()
    });
  }
  
  //Retrieves data from the reactive form holding 
  //Also used only for validation
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
    return this.detailForm.get('emgContact').get('contactEmail');
  }
  constructPhoneArray() {
    var formArray = this.formBuilder.array([]);
    if (this.getSSN() == null) {
        formArray.push(this.formBuilder.group({
          id: [''],
          phone: [''],
          phoneType: [''],
        }));
    }
    return formArray;
  }
  
  //Loads the JSON/Dynamic data from Restful <All Data>
  getPersonDetail(id: any){
    this.restService.getPersonDetailData(id)
    .subscribe(
      data => { 
        this.loadDetailForm(data);
        console.log("details=="+JSON.stringify(data))
      },
      err => {
        console.log("Error occured: getPersonDetails() Failed")
      }
    );
  }

   //Loads the JSON/Dynamic data from Restful <Person Type>
   getPersonType(){
    this.restService.getPersonTypeData()
    .subscribe(
      data => { 
        this.personTypes = data;
        console.log("The variables"+JSON.stringify(data));
      },
      err => {
        console.log("(Person Detail) Error occured: personType() failed")
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
        console.log("(Person Detail) Error occured: phoneType() failed")
      }
    );
  }

  loadDetailForm(data: any) {
    //Initial Detail Fields
    this.detailForm.patchValue({
      'id': data.id,
      'userId': data.userId,
      'password': data.password,
      'confirmPassword': data.password,
      'pertId': data.pertId, 
      'firstName': data.firstName,
      'lastName': data.lastName,
      'ssn': data.ssn,
      'birthDay': formatDate(data.birthDay, 'yyyy-MM-ddT00:00:00', 'en-US'),
      'address': {
        'id': data.address.id,
        'street': data.address.street,
        'city': data.address.city,
        'state': data.address.state,
        'zip': data.address.zip,
      },
      'emgContact':{
        'id': data.emgContact.id,
        'contactName': data.emgContact.contactName,
        'contactRelation': data.emgContact.contactRelation,
        'contactPhone': data.emgContact.contactPhone,
        'contactEmail': data.emgContact.contactEmail
      },
    });
    data.phones.forEach(item => {
      const phone = this.formBuilder.group({
        'id': item.id,
        'phone': item.phone,
        'phoneType': item.phoneType,
      })
      this.phones.push(phone);
    });
  }

  //Getting SSN from the Person List page
  getSSN(){
    return this.route.snapshot.paramMap.get('ssn');
  }
  
  // serializedDate = new FormControl((new Date()).toISOString());

  //Basic Syntax example for getting data from form function
  // get firstName() {
  //   return this.detailForm.get('firstName');
  // }

 /*-------------------
  Adding Phone 
  --------------------*/

  //Retrieve the phone array data
  get phones() {
    return this.detailForm.get('phones') as FormArray
  }

  //Adds Phone & Phone Type below
  addPhone() {
    const phone = this.formBuilder.group({ 
      phone: [],
      phoneType: [],
    })
    this.phones.push(phone);
  }

  //Deletes specific row with Phone & Phone Type
  delPhone(i: any) {
    this.phones.removeAt(i);
  }

  // reset(){
  //   console.log("Resetting...");
  //   this.detailForm.reset();
  //   this.getPersonDetail(this.getSSN());   
  // }

  reset(){
    (<FormGroupExtension>this.detailForm).resetForm();
  }

  onSubmit() {
    //Display Reactive Form's JSON Values
    console.log("Form Data: "+JSON.stringify(this.detailForm.value));
    this.postPerson(this.detailForm.value);

  }

  postPerson(formValue: any) {
    this.restService.postPerson(formValue)
    .subscribe(
      data  => {
         if (data) {
            this.snackBar.open("Person data has been saved successfully!", 'close',  {
              duration: 5000,
              panelClass: ['mat-toolbar', 'mat-primary'] // 'mat-accent' or 'mat-warn'
            });
         } else {
            this.snackBar.open("Person data has been reset successfully!", 'close',  {
              duration: 5000,
              panelClass: ['mat-toolbar', 'mat-warn'] // 'mat-accent' or 'mat-warn'
            });
         }
         console.log("POST Request is successful ", data);
      },
      error  => {
        console.log("Error postPerson()", error);
      }
    );  
  }

}
