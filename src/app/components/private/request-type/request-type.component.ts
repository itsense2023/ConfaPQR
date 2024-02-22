import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BodyResponse } from '../../../models/shared/body-response.inteface';
import { Users } from '../../../services/users.service';
import { ApplicantTypeList, RequestTypeList } from '../../../models/users.interface';

@Component({
  selector: 'app-request-type',
  templateUrl: './request-type.component.html',
  styleUrl: './request-type.component.scss',
})
export class RequestTypeComponent implements OnInit {
  requestTypeList!: RequestTypeList[];
  ingredient!: string;
  visibleDialog = false;
  visibleDialogInput = false;
  message = '';
  buttonmsg = '';
  parameter = [''];
  request_details!: RequestTypeList;
  inputForm: any[] = [];
  enableCreate: boolean = false;
  enableAction: boolean = false;
  constructor(
    private userService: Users,
    private router: Router
  ) {}

  ngOnInit() {
    this.getRequestTypesList();
  }

  getRequestTypesList() {
    this.userService.getRequestTypesList().subscribe({
      next: (response: BodyResponse<RequestTypeList[]>) => {
        if (response.code === 200) {
          this.requestTypeList = response.data;
          this.requestTypeList.forEach(item => {
            item.is_active = item.is_active === 1 ? true : false;
          });
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

  inActiveRequest(request_details: RequestTypeList) {
    if (!request_details.is_active) {
      this.message = '¿Seguro que desea Inactivar este tipo de solicitud?';
      this.visibleDialog = true;
      request_details.is_active = 0;
    } else {
      this.message = '¿Seguro que desea Activar este tipo de solicitud?';
      this.visibleDialog = true;
      request_details.is_active = 1;
    }
    this.request_details = request_details;
  }
  editRequestType(request_details: RequestTypeList) {
    this.inputForm = [
      request_details['request_type_name'],
      request_details['request_type_description'],
      request_details['request_type_id'],
    ];
    this.visibleDialogInput = true;
    this.buttonmsg = 'Modificar';
    this.message = 'Modificar tipo de solicitud';
    this.enableCreate = false;
    this.parameter = [
      'Tipo de solicitud',
      'Escriba nombre',
      'Descripción de solicitud',
      'Escriba descripción',
    ];
  }

  createRequestType() {
    this.visibleDialogInput = true;
    this.buttonmsg = 'Crear';
    this.parameter = [
      'Tipo de solicitud',
      'Escriba nombre',
      'Descripción de solicitud',
      'Escriba descripción',
    ];
    this.message = 'Crear tipo de solicitud';
    this.enableCreate = true;
  }

  closeDialog(value: boolean) {
    this.visibleDialog = false;
    if (value) {
      this.userService.inactivateRequest(this.request_details).subscribe({
        next: (response: BodyResponse<RequestTypeList[]>) => {
          if (response.code === 200) {
            this.ngOnInit();
          } else {
            if ((this.request_details.is_active = 1)) {
              this.request_details.is_active = 0;
            } else {
              this.request_details.is_active = 1;
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
    }
    this.ngOnInit();
  }
  closeDialogInput(value: boolean) {
    this.visibleDialogInput = false;
    this.enableAction = value;
  }
  setParameter(inputValue: string[]) {
    if (!this.enableAction) {
      return;
    } else if (this.enableCreate) {
      const payload = {
        request_type_name: inputValue[0],
        request_type_description: inputValue[1],
      };
      console.log(inputValue);
      this.userService.createRequestType(payload).subscribe({
        next: (response: BodyResponse<string>) => {
          if (response.code === 200) {
          } else {
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
        request_type_name: inputValue[0],
        request_type_description: inputValue[1],
        request_type_id: Number(inputValue[2]),
      };
      console.log(inputValue);
      this.userService.modifyRequestType(payload).subscribe({
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
          this.ngOnInit();
          console.log('La suscripción ha sido completada.');
        },
      });
    }
  }
}
