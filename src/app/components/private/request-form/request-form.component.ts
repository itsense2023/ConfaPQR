import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from '../../../services/users.service';
import { BodyResponse } from '../../../models/shared/body-response.inteface';
import {
  ApplicantAttachments,
  ApplicantTypeList,
  RequestFormList,
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
  requestType!: RequestsList;
  arrayApplicantAttachment: ApplicantAttachments[] = [];
  fileNameList: string[] = [];
  selectedFiles: FileList | null = null;
  base64String: string = '';

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

  constructor(
    private formBuilder: FormBuilder,
    private userService: Users
  ) {
    this.requestForm = this.formBuilder.group(
      {
        document_type: ['', Validators.required],
        number_id: ['', [Validators.required, Validators.pattern('/^[0-9]+$/')]],
        name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
        cellphone: ['', [Validators.required, Validators.pattern('/^[0-9]+$/')]],
        email: ['', [Validators.required, Validators.email]],
        validator_email: ['', [Validators.required, Validators.email]],
        mensage: ['', Validators.required],
      },
      { validator: this.emailMatcher }
    );
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

  onFileSelected(event: any) {
    const files: FileList = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];

      let fileSizeFormat: string;
      const fileName: string = file.name;
      const fileSizeInKiloBytes = file.size / 1024;
      if (fileSizeInKiloBytes < 1024) {
        fileSizeFormat = fileSizeInKiloBytes.toFixed(2) + 'KB';
      } else {
        const fileSizeMegabytes = fileSizeInKiloBytes / 1024;
        fileSizeFormat = fileSizeMegabytes.toFixed(2) + 'MB';
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64String: string = e.target.result.split(',')[1];

        const applicantAttach: ApplicantAttachments = {
          base64file: base64String,
          source_name: fileName,
          fileweight: fileSizeFormat,
        };

        this.fileNameList.push(fileName);
        this.arrayApplicantAttachment.push(applicantAttach);
      };
      reader.readAsDataURL(file);
    }
  }

  getAplicant(): ApplicantAttachments[] {
    return this.arrayApplicantAttachment;
  }

  clearFileInput(index: number) {
    this.fileNameList.splice(index, 1);
  }

  getApplicantList() {
    //this.userService.getFormById(this.applicantType.applicant_type_id).subscribe({
    this.userService.getFormById(0).subscribe({
      next: (response: BodyResponse<any[]>): void => {
        if (response.code === 200) {
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

  setParameter(inputValue: RequestFormList) {
    this.userService.createRequest(inputValue).subscribe({
      next: (response: BodyResponse<string>) => {
        if (response.code === 200) {
          this.requestForm.reset();
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

  sendRequest() {
    console.log(this.getAplicant());

    const payload: RequestFormList = {
      request_status: 1,
      applicant_type: this.applicantType.applicant_type_id,
      request_type: this.requestType.request_id,
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
      applicant_attachments: this.getAplicant(),
      assigned_attachments: null,
      form_id: this.requestType.form_id,
    };
    this.setParameter(payload);
  }
}
