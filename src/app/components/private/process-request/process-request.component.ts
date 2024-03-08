import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BodyResponse } from '../../../models/shared/body-response.inteface';
import { Users } from '../../../services/users.service';
import {
  ApplicantTypeList,
  RequestTypeList,
  RequestsList,
  UserList,
} from '../../../models/users.interface';
import { RoutesApp } from '../../../enums/routes.enum';
import { MessageService } from 'primeng/api';
import { SessionStorageItems } from '../../../enums/session-storage-items.enum';

@Component({
  selector: 'app-process-request',
  templateUrl: './process-request.component.html',
  styleUrl: './process-request.component.scss',
})
export class ProcessRequestComponent implements OnInit {
  requestList: RequestsList[] = [];
  requestListByAssigned: RequestsList[] = [];
  aplicantList: ApplicantTypeList[] = [];
  requestTypeList: RequestTypeList[] = [];
  userList: UserList[] = [];
  ingredient!: string;
  parameter = [''];
  request_details!: RequestsList;
  selectedRequests!: RequestsList[];
  informative: boolean = false;

  visibleDialogAlert = false;
  statusOptions!: string[];
  daysOption!: number[];
  selectedDaysOptions!: number[];
  selectedStatusOptions!: string[];
  user: string = '';
  constructor(
    private userService: Users,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.user = sessionStorage.getItem(SessionStorageItems.USER) || '';
    //console.log(this.user);
    this.getRequestList();
    this.getRequestListByAssignedUser();
    this.getApplicantTypeList();
    this.getRequestTypeList();
    this.getUsersList();
  }

  showSuccessMessage(state: string, title: string, message: string) {
    this.messageService.add({ severity: state, summary: title, detail: message });
  }
  getRequestList() {
    this.userService.getRequestList().subscribe({
      next: (response: BodyResponse<RequestsList[]>) => {
        if (response.code === 200) {
          this.requestList = response.data;
          this.daysOption = Array.from(new Set(this.requestList.map(item => item.request_days)));
          this.statusOptions = Array.from(new Set(this.requestList.map(item => item.status_name)));
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
  getRequestListByAssignedUser() {
    this.userService.getRequestListByAssignedUser(this.user).subscribe({
      next: (response: BodyResponse<RequestsList[]>) => {
        if (response.code === 200) {
          this.requestListByAssigned = response.data;
          console.log(this.requestListByAssigned);
          this.daysOption = Array.from(new Set(this.requestList.map(item => item.request_days)));
          this.statusOptions = Array.from(new Set(this.requestList.map(item => item.status_name)));
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
  getApplicantTypeList() {
    this.userService.getApplicantTypesList().subscribe({
      next: (response: BodyResponse<ApplicantTypeList[]>) => {
        if (response.code === 200) {
          this.aplicantList = response.data.filter(obj => obj.is_active !== 0);
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
  getRequestTypeList() {
    this.userService.getRequestTypesList().subscribe({
      next: (response: BodyResponse<RequestTypeList[]>) => {
        if (response.code === 200) {
          this.requestTypeList = response.data;
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
  getUsersList() {
    this.userService.getUsersList().subscribe({
      next: (response: BodyResponse<UserList[]>) => {
        if (response.code === 200) {
          this.userList = response.data;
          console.log(this.userList);
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

  redirectDetails(request_id: number) {
    localStorage.removeItem('route');
    localStorage.setItem('route', this.router.url);
    this.router.navigate([RoutesApp.REQUEST_DETAILS, request_id]);
  }
}
