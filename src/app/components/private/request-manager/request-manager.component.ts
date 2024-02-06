import { Component, OnInit } from '@angular/core';
import { IRequestManager } from '../../../models/request-manager/request-manager.interface';
import { Router } from '@angular/router';
import { BodyResponse } from '../../../models/shared/body-response.inteface';
import { Users } from '../../../services/users.service';
import { UserList } from '../../../models/users.interface';

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
  message = '';
  constructor(
    private userService: Users,
    private router: Router
  ) {}

  ngOnInit() {
    //this.data = this.generateTestData(10);
    this.getUsersTable();
    //console.log(this.data);
  }

  getUsersTable() {
    this.userService.getUsersList().subscribe({
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
    });
  }

  inactive(user_details: UserList) {
    console.log(user_details);
    if (user_details.is_active) {
      console.log('Inactivar');
      this.message = '¿Seguro que desea inactivar este responsable de solicitud?';
      this.visibleDialog = true;
      user_details.is_active = 0;
      this.userService.inactivateUser(user_details).subscribe({
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
      });
    } else {
      console.log('Activar');
      this.message = '¿Seguro que desea activar este responsable de solicitud?';
      this.visibleDialog = true;
      user_details.is_active = 1;
      this.userService.inactivateUser(user_details).subscribe({
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
      });
    }
  }
  delete(user_details: UserList) {
    this.message = '¿Seguro que desea Invisibilizar este responsable de solicitud?';
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
    });
  }
  createUser() {}
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
    if (value) {
      // accion de eliminar
    }
  }
}
