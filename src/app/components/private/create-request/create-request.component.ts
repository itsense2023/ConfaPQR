import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from '../../../services/users.service';
import {
  ApplicantTypeList,
  AssociateApplicantRequest,
  RequestTypeList,
} from '../../../models/users.interface';
import { BodyResponse } from '../../../models/shared/body-response.inteface';
import { Router } from '@angular/router';
import { RoutesApp } from '../../../enums/routes.enum';

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
    private userService: Users
  ) {
    this.optionsRequest = this.formBuilder.group({
      applicant_id: ['', Validators.required],
      request_id: ['', Validators.required],
      authorize: [null, Validators.required],
    });

    this.getApplicantList();
    this.getRequestList();
  }

  getApplicantList() {
    this.userService.getApplicantTypesList().subscribe({
      next: (response: BodyResponse<ApplicantTypeList[]>) => {
        if (response.code === 200) {
          this.applicantList = response.data;
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

  getRequestList() {
    this.userService.getRequestTypesList().subscribe({
      next: (response: BodyResponse<RequestTypeList[]>) => {
        if (response.code === 200) {
          this.requestList = response.data;
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
   //console.log(this.optionsRequest.controls['applicant_id'].value,this.optionsRequest.controls['request_id'].value)
   localStorage.setItem('applicant-type',JSON.stringify(this.optionsRequest.controls['applicant_id'].value))
   localStorage.setItem('request-type',JSON.stringify(this.optionsRequest.controls['request_id'].value))
   this.router.navigate([RoutesApp.REQUEST_FORM]);
  }
  }

