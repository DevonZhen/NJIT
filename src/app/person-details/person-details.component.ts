import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {

  detailForm: FormGroup;

  hide=true;
  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.buildDetailForm()
  }

  buildDetailForm() {
    this.detailForm = this.formBuilder.group({
      firstName: this.formBuilder.control('',[Validators.required]),
      lastName: this.formBuilder.control(''),
      userId: this.formBuilder.control(''),
      password: this.formBuilder.control(''),
      ssn: this.formBuilder.control(''),
      birthday: this.formBuilder.control(''),
      datepicker: this.formBuilder.control(''),
      contactName: this.formBuilder.control(''),
      contactRelation: this.formBuilder.control(''),
      contactPhone: this.formBuilder.control(''),
      contactEmail: this.formBuilder.control(''),
    });
  
  }

  loadDetailForm(data: any) {
    //Initial Detail Fields
    this.detailForm.patchValue({
      'firstName': data.firstName,
    }); 
  }

  get firstName() {
    return this.detailForm.get('firstName');
  }

  onSubmit() {

  }
}
