import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BodyResponse } from '../../../models/shared/body-response.inteface';
import { Users } from '../../../services/users.service';
import { AssignUserRequest, RequestsList } from '../../../models/users.interface';

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
  buttonmsg = '';
  parameter = [''];
  request_details!: RequestsList;
  selectedRequests!: RequestsList[];
  constructor(
    private userService: Users,
    private router: Router
  ) {}

  ngOnInit() {
    this.getRequestList();
  }

  getRequestList() {
    this.userService.getRequestList().subscribe({
      next: (response: BodyResponse<RequestsList[]>) => {
        if (response.code === 200) {
          this.requestList = response.data;
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

  assignRequest(request_details: RequestsList) {
    if (request_details.assigned_user == null) {
      this.message = 'Asignar responsable al requerimiento';
      this.buttonmsg = 'Asignar';
    } else {
      this.message = 'Reasignar responsable al requerimiento';
      this.buttonmsg = 'Reasignar';
    }
    this.visibleDialogInput = true;
    this.parameter = ['Usuario'];
    this.request_details = request_details;
    console.log(request_details);
    /*user_details.is_visible = 0;
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
  setParameter(inputValue: string) {
    console.log(inputValue);
    this.request_details['assigned_user'] = inputValue;
    if (inputValue) {
      this.userService.assignUserToRequest(this.request_details).subscribe({
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
}
