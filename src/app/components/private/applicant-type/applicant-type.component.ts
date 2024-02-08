import { Component, OnInit } from '@angular/core';
import { IRequestManager } from '../../../models/request-manager/request-manager.interface';
import { Router } from '@angular/router';
import { BodyResponse } from '../../../models/shared/body-response.inteface';
import { Users } from '../../../services/users.service';
import { ApplicantTypeList } from '../../../models/users.interface';

@Component({
  selector: 'app-applicant-type',
  templateUrl: './applicant-type.component.html',
  styleUrl: './applicant-type.component.scss',
})
export class ApplicantTypeComponent implements OnInit {
  data!: IRequestManager[];
  applicantTypeList!: ApplicantTypeList[];
  applicant_type_details!: ApplicantTypeList;
  ingredient!: string;
  visibleDialog = false;
  visibleDialogInput = false;
  message = '';
  buttonmsg = '';
  parameter = [''];
  constructor(
    private userService: Users,
    private router: Router
  ) {}

  ngOnInit() {
    this.getApplicantTypesList();
  }

  getApplicantTypesList() {
    this.userService.getApplicantTypesList().subscribe({
      next: (response: BodyResponse<ApplicantTypeList[]>) => {
        if (response.code === 200) {
          this.applicantTypeList = response.data;
          this.applicantTypeList.forEach(item => {
            item.is_active = item.is_active === 1 ? true : false;
          });
        } else {
          console.log(this.applicantTypeList);
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

  inActiveApplicant(applicant_type_details: ApplicantTypeList) {
    if (!applicant_type_details.is_active) {
      console.log('Inactivar');
      this.message = '¿Seguro que desea inactivar este responsable de solicitud?';
      this.visibleDialog = true;
      applicant_type_details.is_active = 0;
    } else {
      console.log('Activar');
      this.message = '¿Seguro que desea activar este responsable de solicitud?';
      this.visibleDialog = true;
      applicant_type_details.is_active = 1;
    }
    this.applicant_type_details = applicant_type_details;
  }
  editApplicant(applicant_details: ApplicantTypeList) {
    /*this.message = '¿Seguro que desea Invisibilizar este responsable de solicitud?';
    this.visibleDialog = true;
    user_details.is_visible = 0;
    this.userService.invisibleUser(user_details).subscribe({
      next: (response: BodyResponse<UserList[]>) => {
        if (response.code === 200) {
          this.userList = response.data;
        } else {
          console.log(this.userList);
        }
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('La suscripción ha sido completada.');
      },
    });*/
  }
  createApplicantType() {
    this.visibleDialogInput = true;
    this.buttonmsg = 'Crear';
    this.parameter = [
      'tipo de solicitante',
      'Escriba nombre',
      'Descripción del solicitante',
      'Escriba descripción',
    ];
    this.message = 'Crear tipo de solicitante';
  }

  closeDialog(value: boolean) {
    this.visibleDialog = false;
    console.log(value);
    if (value) {
      this.userService.inactivateApplicant(this.applicant_type_details).subscribe({
        next: (response: BodyResponse<ApplicantTypeList[]>) => {
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
  closeDialogInput(value: boolean) {
    this.visibleDialogInput = false;
    if (value) {
      // accion de eliminar
    }
  }
  setParameter(inputValue: string[]) {
    console.log(inputValue);
    const payload = {
      applicant_type_name: inputValue[0],
      applicant_type_description: inputValue[1],
    };
    console.log(payload);
    this.userService.createApplicantType(payload).subscribe({
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
