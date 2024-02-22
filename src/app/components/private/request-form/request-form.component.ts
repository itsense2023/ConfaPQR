import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateRequestComponent } from '../create-request/create-request.component';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrl: './request-form.component.scss'
})
export class RequestFormComponent {

  
  @ViewChild('archive_request') fileInput!: ElementRef;

  requestForm:FormGroup
  fileName:string=''

  constructor( private formBuilder:FormBuilder){
    this.requestForm=this.formBuilder.group({
      document_type:["" ,Validators.required],
      number_id:["", Validators.required],
      name:["", Validators.required],
      number_cellphone:["", Validators.required],
      email:["", Validators.required],
      validator_email:["", Validators.required],
      mensaje:["", Validators.required],
    })
}
openFileInput() {
  this.fileInput.nativeElement.click(); 
}

onFileSelected(event: any) {
  const file: File = event.target.files[0];
  this.fileName= file.name;
}

clearFileInput() {
  this.fileInput.nativeElement.value = '';
  this.fileName=""
}

sendRequest(){

}


}
