import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from '../../../services/users.service';
import { ApplicantTypeList, RequestTypeList, RequestsList } from '../../../models/users.interface';
import { BodyResponse } from '../../../models/shared/body-response.inteface';
import { Router } from '@angular/router';
import { RoutesApp } from '../../../enums/routes.enum';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrl: './create-request.component.scss',
})
export class CreateRequestComponent {
  optionsRequest: FormGroup;
  applicantList!: ApplicantTypeList[];
  requestList!: RequestTypeList[];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: Users,
    private messageService: MessageService
  ) {
    this.optionsRequest = this.formBuilder.group({
      applicant_id: ['', Validators.required],
      request_id: ['', Validators.required],
      authorize: [null, Validators.requiredTrue],
    });

    this.getApplicantList();
  }
  changeRequest() {
    this.optionsRequest.get('request_id')?.setValue('');
    this.optionsRequest.get('authorize')?.setValue(false);
  }

  showSuccessMessage(state: string, title: string, message: string) {
    this.messageService.add({ severity: state, summary: title, detail: message });
  }
  getRequest() {
    this.getRequestList(this.optionsRequest.controls['applicant_id'].value['applicant_type_id']);
  }
  getApplicantList() {
    this.userService.getApplicantTypesList().subscribe({
      next: (response: BodyResponse<ApplicantTypeList[]>) => {
        if (response.code === 200) {
          //this.applicantList = response.data;
          this.applicantList = response.data.filter(obj => obj.is_active !== 0);
        } else {
          this.showSuccessMessage('error', 'Fallida', 'Operación fallida!');
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
  getRequestList(payload: number) {
    this.userService.getRequestsTypeByApplicantType(payload).subscribe({
      next: (response: BodyResponse<RequestTypeList[]>) => {
        if (response.code === 200) {
          //this.requestList = response.data;
          this.requestList = response.data.filter(obj => obj.is_active !== 0);
        } else {
          this.showSuccessMessage('error', 'Fallida', 'Operación fallida!');
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

  sendOptions() {
    console.log(this.optionsRequest.controls['applicant_id'].value);
    localStorage.setItem(
      'applicant-type',
      JSON.stringify(this.optionsRequest.controls['applicant_id'].value)
    );
    localStorage.setItem(
      'request-type',
      JSON.stringify(this.optionsRequest.controls['request_id'].value)
    );
    this.router.navigate([RoutesApp.REQUEST_FORM]);
  }
}
