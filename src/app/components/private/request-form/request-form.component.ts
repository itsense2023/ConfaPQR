import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateRequestComponent } from '../create-request/create-request.component';
import { ActivatedRoute } from '@angular/router';
import { Users } from '../../../services/users.service';
import { BodyResponse } from '../../../models/shared/body-response.inteface';
import {
  ApplicantTypeList,
  RequestFormList,
  RequestTypeList,
  RequestsList,
} from '../../../models/users.interface';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrl: './request-form.component.scss',
})
export class RequestFormComponent implements OnInit {
  @ViewChild('archive_request') fileInput!: ElementRef;

  requestForm: FormGroup;

  documentList!: [];
  document!: string;
  applicantType!: ApplicantTypeList;
  requestType!: RequestTypeList;
  fileNameList: string[] = [];
  fileSizeList: string[] = [];
  fileBase64: string[] = [];
  selectedFiles: FileList | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: Users
  ) {
    this.requestForm = this.formBuilder.group(
      {
        document_type: ['', Validators.required],
        number_id: ['', Validators.required],
        name: ['', Validators.required],
        cellphone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        validator_email: ['', [Validators.required, Validators.email]],
        mensage: ['', Validators.required],
      },
      { validator: this.emailMatcher }
    );
  }
  ngOnInit(): void {
    let applicant = localStorage.getItem('applicant-type');
    if (applicant) {
      this.applicantType = JSON.parse(applicant);
    }
    let request = localStorage.getItem('request-type');
    if (request) {
      this.requestType = JSON.parse(request);
    }
    this.getApplicantList();
  }

  emailMatcher(formControl: AbstractControl) {
    const email = formControl.get('email')?.value;
    const emailConfirmed = formControl.get('validator_email')?.value;
    if (email !== emailConfirmed) {
      formControl.get('validator_email')?.setErrors({ notMatched: true });
    }
  }

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  convertToBase64(file:File){
    const reader=new FileReader()
    reader.onload=(e:any)=>{
      const base64:string=e.target.result
      console.log(base64)
    }
    reader.readAsDataURL(file)
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      let fileSizeFormat:string
      const fileSizeKilobytes=files[i].size/1024
      
      if(fileSizeKilobytes<1024){
        fileSizeFormat=fileSizeKilobytes.toFixed(2)+'KB'
      }else{
        const fileSizeMegabytes=fileSizeKilobytes/1024
        fileSizeFormat=fileSizeMegabytes.toFixed(2)+'MB'
      }
      this.fileSizeList.push(fileSizeFormat);
      this.convertToBase64(files[i])
      this.fileNameList.push(files[i].name);
    }
    console.log(this.fileSizeList)
    console.log(this.fileNameList)
    console.log(this.fileBase64)
  }

  clearFileInput(index: number) {
    this.fileInput.nativeElement.value = '';
    this.fileNameList.splice(index, 1);
    this.fileSizeList.splice(index, 1);
    this.fileBase64.splice(index, 1);
  }

  setParameter(inputValue: RequestFormList) {
    this.userService.createRequest(inputValue).subscribe({
      next: (response: BodyResponse<string>) => {
        if (response.code === 200) {
          console.log(inputValue);
        } else {
        }
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('La suscripción ha sido completada post.');
      },
    });
  }

  getApplicantList() {
    this.userService.getFormById(0).subscribe({
      next: (response: BodyResponse<any[]>): void => {
        if (response.code === 200) {
          console.log(response.data);
          this.documentList = response.data[0].catalog_source;
        }
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('La suscripción ha sido completada.');
      },
    });
  }

  sendRequest() {
    const payload: RequestFormList = {
      request_status: 1,
      applicant_type: this.applicantType.applicant_type_id,
      request_type: this.requestType.request_type_id,
      doc_type: this.requestForm.controls['document_type'].value['catalog_item_id'],
      doc_id: this.requestForm.controls['number_id'].value,
      applicant_name: this.requestForm.controls['name'].value,
      applicant_email: this.requestForm.controls['email'].value,
      applicant_cellphone: this.requestForm.controls['cellphone'].value,
      request_description: this.requestForm.controls['mensage'].value,
      request_days: 15,
      assigned_user: '',
      request_answer: '',
      data_treatment: true,
      applicant_attachments: [''],
      assigned_attachments: [''],
      source_name: this.fileNameList,
    };
    this.setParameter(payload);
  }
}
