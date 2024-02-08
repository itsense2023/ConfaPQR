import { Component, OnInit } from '@angular/core';
import { IRequestManager } from '../../../models/request-manager/request-manager.interface';
import { Router } from '@angular/router';
import { BodyResponse } from '../../../models/shared/body-response.inteface';
import { Users } from '../../../services/users.service';
import {
  ApplicantTypeList,
  AssociateApplicantRequest,
  AssociationApplicantRequestList,
  RequestTypeList,
} from '../../../models/users.interface';
@Component({
  selector: 'app-applicant-request',
  templateUrl: './applicant-request.component.html',
  styleUrl: './applicant-request.component.scss',
})
export class ApplicantRequestComponent implements OnInit {
  requestTypeList!: RequestTypeList[];
  applicantTypeList!: ApplicantTypeList[];
  applicantTypeRequestsList!: AssociationApplicantRequestList[];
  applicant_request_association!: AssociationApplicantRequestList;
  ingredient!: string;
  visibleDialog = false;
  visibleDialogSelector = false;
  message = '';
  buttonmsg = '';
  parameter = [''];
  constructor(
    private userService: Users,
    private router: Router
  ) {}

  ngOnInit() {
    this.getApplicantTypeRequestsAssociation();
  }

  getApplicantTypeRequestsAssociation() {
    this.userService.getApplicantTypeRequestsAssociation().subscribe({
      next: (response: BodyResponse<AssociationApplicantRequestList[]>) => {
        if (response.code === 200) {
          this.applicantTypeRequestsList = response.data;
          this.applicantTypeRequestsList.forEach(item => {
            item.is_active = item.is_active === 1 ? true : false;
          });
        } else {
          console.log(this.applicantTypeRequestsList);
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

  in_active_association(applicant_request_association: AssociationApplicantRequestList) {
    console.log(applicant_request_association);
    if (!applicant_request_association.is_active) {
      console.log('Inactivar');
      this.message = '¿Seguro que desea Inactivar la relación del solicitante con la solicitud?';
      this.visibleDialog = true;
      applicant_request_association.is_active = 0;
    } else {
      console.log('Activar');
      this.message = '¿Seguro que desea Activar la relación del solicitante con la solicitud?';
      this.visibleDialog = true;
      applicant_request_association.is_active = 1;
    }
    this.applicant_request_association = applicant_request_association;
  }
  closeDialog(value: boolean) {
    this.visibleDialog = false;
    if (value) {
      this.userService
        .inactivateAssociationApplicantRequest(this.applicant_request_association)
        .subscribe({
          next: (response: BodyResponse<string>) => {
            if (response.code === 200) {
              this.ngOnInit();
              console.log(response.data);
            } else {
              console.log(response.data);
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
  }

  closeDialogSelector(value: boolean) {
    this.visibleDialogSelector = false;
    if (value) {
      // accion de eliminar
    }
  }

  associateRequestsType() {
    this.visibleDialogSelector = true;
    this.buttonmsg = 'Asociar';
    this.parameter = ['Tipo de solicitante', 'Tipo de solicitud'];
    this.message = 'Asociar solicitante a tipo de solicitud';
  }

  setParameter(inputValue: AssociateApplicantRequest) {
    this.userService.createAssociationApplicantRequest(inputValue).subscribe({
      next: (response: BodyResponse<string>) => {
        if (response.code === 200) {
          this.ngOnInit();
        } else {
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
}
