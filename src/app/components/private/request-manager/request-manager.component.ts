import { Component, OnInit } from '@angular/core';
import { IRequestManager } from '../../../models/request-manager/request-manager.interface';
import { Router } from '@angular/router';
import { BodyResponse, ZionResponse } from '../../../models/shared/body-response.inteface';
import { Users } from '../../../services/users.service';
import { UserList } from '../../../models/users.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-request-manager',
  templateUrl: './request-manager.component.html',
  styleUrl: './request-manager.component.scss',
})
export class RequestManagerComponent implements OnInit {
  data!: IRequestManager[];
  userList!: UserList[];
  ingredient!: string;
  visibleDialog = false;
  visibleDialogInput = false;
  message = '';
  parameter = [''];
  buttonmsg = '';
  twoFields = false;
  user_details!: UserList;
  enableAction: boolean = false;
  enableDelete: boolean = false;
  informative: boolean = false;
  constructor(
    private userService: Users,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    //this.data = this.generateTestData(10);
    this.getUsersTable();
  }
  showSuccessMessage(state: string, title: string, message: string) {
    this.messageService.add({ severity: state, summary: title, detail: message });
  }
  getUsersTable() {
    this.userService.getUsersList().subscribe({
      next: (response: BodyResponse<UserList[]>) => {
        if (response.code === 200) {
          this.userList = response.data;
          this.userList.forEach(item => {
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

  inactive(user_details: UserList) {
    if (!user_details.is_active) {
      /*console.log('Inactivar');
      this.message = '¿Seguro que desea inactivar este responsable de solicitud?';
      this.visibleDialog = true;*/
      user_details.is_active = 0;
    } else {
      /*console.log('Activar');
      this.message = '¿Seguro que desea activar este responsable de solicitud?';
      this.visibleDialog = true;*/
      user_details.is_active = 1;
    }
    this.userService.inactivateUser(user_details).subscribe({
      next: (response: BodyResponse<UserList[]>) => {
        if (response.code === 200) {
          this.showSuccessMessage('success', 'Exitoso', 'Operación exitosa!');
        } else {
          this.showSuccessMessage('error', 'Fallida', 'Operación fallida!');
          if ((this.user_details.is_active = 1)) {
            this.user_details.is_active = 0;
          } else {
            this.user_details.is_active = 1;
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
  delete(user_details: UserList) {
    this.message = '¿Seguro que desea Eliminar responsable?';
    this.visibleDialog = true;
    user_details.is_visible = 0;
    this.user_details = user_details;
    this.enableDelete = true;
  }
  generateTestData = (count: number): IRequestManager[] => {
    const testData: IRequestManager[] = [];
    for (let i = 0; i < count; i++) {
      const requestManager: IRequestManager = {
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        status: i % 2 === 0, // Alternar entre true y false
      };
      testData.push(requestManager);
    }
    return testData;
  };

  closeDialog(value: boolean) {
    this.visibleDialog = false;
    if (this.informative) {
      return;
    } else if (!this.enableDelete) {
      this.userService.invisibleUser(this.user_details).subscribe({
        next: (response: BodyResponse<UserList[]>) => {
          if (response.code === 200) {
            this.showSuccessMessage('success', 'Exitoso', 'Operación exitosa!');
            this.userList = response.data;
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
  createUser() {
    this.visibleDialogInput = true;
    this.buttonmsg = 'Crear';
    this.twoFields = false;
    this.parameter = ['Crear Responsable', 'Escriba usuario de red'];
    this.message = 'Crear Responsable';
    this.informative = true;
  }
  closeDialogInput(value: boolean) {
    this.visibleDialogInput = false;
    this.enableAction = value;
  }
  setParameter(inputValue: string[]) {
    if (!this.enableAction) {
      return;
    } else {
      const payload = {
        user_name: inputValue[0],
      };
      this.userService.createUser(payload).subscribe({
        next: (response: BodyResponse<ZionResponse>) => {
          if (response.code === 200) {
            this.showSuccessMessage('success', 'Exitoso', 'Operación exitosa!');
          } else {
            this.showSuccessMessage('error', 'Fallida', 'Operación fallida!');
            this.message = response.data.estado;
            this.visibleDialog = true;
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
