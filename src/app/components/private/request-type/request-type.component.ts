import { Component, OnInit } from '@angular/core';
import { IRequestManager } from '../../../models/request-manager/request-manager.interface';
import { Router } from '@angular/router';
import { BodyResponse } from '../../../models/shared/body-response.inteface';
import { Users } from '../../../services/users.service';
import { ApplicantTypeList, RequestTypeList, UserList } from '../../../models/users.interface';

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
      this.message = '¿Seguro que desea Inactivar este responsable de solicitud?';
      this.visibleDialog = true;
      request_details.is_active = 0;
    } else {
      this.message = '¿Seguro que desea Activar este responsable de solicitud?';
      this.visibleDialog = true;
      request_details.is_active = 1;
    }
    this.request_details = request_details;
  }
  editRequest(request_details: ApplicantTypeList) {
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
  createUser() {}

  createRequestType() {
    this.visibleDialogInput = true;
    this.buttonmsg = 'Crear';
    this.parameter = [
      'tipo de solicitud',
      'Escriba nombre',
      'Descripción de solicitud',
      'Escriba descripción',
    ];
    this.message = 'Crear tipo de solicitud';
  }

  closeDialog(value: boolean) {
    this.visibleDialog = false;
    if (value) {
      this.userService.inactivateRequest(this.request_details).subscribe({
        next: (response: BodyResponse<RequestTypeList[]>) => {
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
      request_type_name: inputValue[0],
      request_type_description: inputValue[1],
    };
    console.log(payload);
    this.userService.createRequestType(payload).subscribe({
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
