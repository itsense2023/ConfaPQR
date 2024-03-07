import { Component, OnInit } from '@angular/core';
import { IRequestManager } from '../../../models/request-manager/request-manager.interface';
import { Router } from '@angular/router';
import { BodyResponse } from '../../../models/shared/body-response.inteface';
import { Users } from '../../../services/users.service';
import { ApplicantTypeList } from '../../../models/users.interface';
import { MessageService } from 'primeng/api';

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
  inputForm: any[] = [];
  enableCreate: boolean = false;
  enableAction: boolean = false;

  constructor(
    private userService: Users,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getApplicantTypesList();
  }
  showSuccessMessage(state: string, title: string, message: string) {
    this.messageService.add({ severity: state, summary: title, detail: message });
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

  inActiveApplicant(applicant_type_details: ApplicantTypeList) {
    if (!applicant_type_details.is_active) {
      console.log('Inactivar');
      this.message = '¿Seguro que desea Inactivar este tipo de solicitante?';
      this.visibleDialog = true;
      applicant_type_details.is_active = 0;
    } else {
      console.log('Activar');
      this.message = '¿Seguro que desea Activar este tipo de solicitante?';
      this.visibleDialog = true;
      applicant_type_details.is_active = 1;
    }
    this.applicant_type_details = applicant_type_details;
  }
  editApplicant(applicant_details: ApplicantTypeList) {
    this.inputForm = [
      applicant_details['applicant_type_name'],
      applicant_details['applicant_type_description'],
      applicant_details['applicant_type_id'],
    ];
    this.visibleDialogInput = true;
    this.enableCreate = false;
    this.message = 'Crear tipo de solicitante';
    this.buttonmsg = 'Modificar';
    this.parameter = [
      'Tipo de solicitante',
      'Escriba nombre',
      'Descripción del solicitante',
      'Escriba descripción',
    ];
  }
  createApplicantType() {
    this.visibleDialogInput = true;
    this.enableCreate = true;
    this.buttonmsg = 'Crear';
    this.parameter = [
      'Tipo de solicitante',
      'Escriba nombre',
      'Descripción del solicitante',
      'Escriba descripción',
    ];
    this.message = 'Crear tipo de solicitante';
  }

  closeDialog(value: boolean) {
    this.visibleDialog = false;
    if (value) {
      this.userService.inactivateApplicant(this.applicant_type_details).subscribe({
        next: (response: BodyResponse<ApplicantTypeList[]>) => {
          if (response.code === 200) {
            this.showSuccessMessage('success', 'Exitoso', 'Operación exitosa!');
          } else {
            this.showSuccessMessage('error', 'Fallida', 'Operación fallida!');
            if ((this.applicant_type_details.is_active = 1)) {
              this.applicant_type_details.is_active = 0;
            } else {
              this.applicant_type_details.is_active = 1;
            }
          }
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          this.ngOnInit();
          console.log('La suscripción ha sido completada.');
        },
      });
    } else {
      this.ngOnInit();
    }
  }
  closeDialogInput(value: boolean) {
    this.visibleDialogInput = false;
    this.enableAction = value;
  }
  setParameter(inputValue: string[]) {
    if (!this.enableAction) {
      return;
    } else if (this.enableCreate) {
      console.log(inputValue);
      const payload = {
        applicant_type_name: inputValue[0],
        applicant_type_description: inputValue[1],
      };
      console.log(payload);
      this.userService.createApplicantType(payload).subscribe({
        next: (response: BodyResponse<string>) => {
          if (response.code === 200) {
            this.showSuccessMessage('success', 'Exitoso', 'Operación exitosa!');
          } else {
            this.showSuccessMessage('error', 'Fallida', 'Operación fallida!');
          }
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          this.ngOnInit();
          console.log('La suscripción ha sido completada.');
        },
      });
    } else {
      const payload = {
        applicant_type_name: inputValue[0],
        applicant_type_description: inputValue[1],
        applicant_type_id: Number(inputValue[2]),
      };
      this.userService.modifyApplicantType(payload).subscribe({
        next: (response: BodyResponse<string>) => {
          if (response.code === 200) {
            this.showSuccessMessage('success', 'Exitoso', 'Operación exitosa!');
          } else {
            this.showSuccessMessage('error', 'Fallida', 'Operación fallida!');
          }
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          this.ngOnInit();
          console.log('La suscripción ha sido completada.');
        },
      });
    }
    this.ngOnInit();
  }
}
