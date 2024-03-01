import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BodyResponse } from '../../../models/shared/body-response.inteface';
import { Users } from '../../../services/users.service';
import { RequestsList } from '../../../models/users.interface';
import { RoutesApp } from '../../../enums/routes.enum';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-search-request',
  templateUrl: './search-request.component.html',
  styleUrl: './search-request.component.scss',
})
export class SearchRequestComponent implements OnInit {
  requestList: RequestsList[] = [];
  ingredient!: string;
  visibleDialog = false;
  visibleDialogInput = false;
  message = '';
  message2 = '';
  buttonmsg = '';
  parameter = [''];
  request_details!: RequestsList;
  selectedRequests!: RequestsList[];
  informative: boolean = false;
  severity = '';
  visibleDialogAlert = false;
  constructor(
    private userService: Users,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getRequestList();
  }
  showSuccessMessage(state: string, title: string, message: string) {
    this.messageService.add({ severity: state, summary: title, detail: message });
  }
  getRequestList() {
    this.userService.getRequestList().subscribe({
      next: (response: BodyResponse<RequestsList[]>) => {
        if (response.code === 200) {
          this.requestList = response.data;
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

  assignRequest(request_details: RequestsList) {
    if (request_details.assigned_user == null || request_details.assigned_user == '') {
      this.message = 'Asignar responsable de solicitud';
      this.buttonmsg = 'Asignar';
    } else {
      this.message = 'Reasignar responsable de solicitud';
      this.buttonmsg = 'Reasignar';
    }
    this.visibleDialogInput = true;
    this.parameter = ['Colaborador'];
    this.request_details = request_details;
    console.log(request_details);
  }

  closeDialog(value: boolean) {
    this.visibleDialog = false;
    if (value) {
      //
    }
  }
  closeDialogInput(value: boolean) {
    this.visibleDialogInput = false;
    if (value) {
      // accion de eliminar
    }
  }
  closeDialogAlert(value: boolean) {
    this.visibleDialogAlert = false;
  }
  setParameter(inputValue: string) {
    if ((this.request_details['assigned_user'] = inputValue)) {
      this.visibleDialogAlert = true;
      this.informative = true;
      this.message = 'Verifique el responsable a asignar';
      this.message2 =
        'Recuerde que, para realizar una reasignación, es necesario seleccionar un colaborador diferente';
      this.severity = 'danger';
      return;
    }
    this.request_details['assigned_user'] = inputValue;
    if (inputValue) {
      this.userService.assignUserToRequest(this.request_details).subscribe({
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
  }
  redirectDetails(request_id: number) {
    this.router.navigate([RoutesApp.REQUEST_DETAILS, request_id]);
  }
}
