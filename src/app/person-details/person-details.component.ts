import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

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

  personTypes: PERSON_TYPE[];
  phoneTypes: PHONE_TYPE[];
  detailForm: FormGroup;

  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    console.log("Start Here!");
    this.buildDetailForm()
  }

  buildDetailForm() {
    this.detailForm = this.formBuilder.group({
      userId: this.formBuilder.control(''),
      password: this.formBuilder.control(''),
      confirmPassword: this.formBuilder.control(''),
      personType: this.formBuilder.control(''),
      firstName: this.formBuilder.control('',[Validators.required]),
      lastName: this.formBuilder.control(''),
      ssn: this.formBuilder.control(''),
      birthday: this.formBuilder.control(''),
      datepicker: this.formBuilder.control(''),
      contactName: this.formBuilder.control(''),
      contactRelation: this.formBuilder.control(''),
      contactPhone: this.formBuilder.control(''),
      contactEmail: this.formBuilder.control(''),
      phone: this.formBuilder.control(''),
      phoneType: this.formBuilder.control(''),
      pphoneArray: this.constructPhoneArray()
    });
  }

  //Retrieves data from the reactie form holding
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
  }

  get firstName() {
    return this.detailForm.get('firstName');
  }

  onSubmit() {

  }
}
