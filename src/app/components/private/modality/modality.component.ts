import { Component, OnInit } from '@angular/core';
import { IRequestManager } from '../../../models/request-manager/request-manager.interface';
import { Router } from '@angular/router';
import { BodyResponse } from '../../../models/shared/body-response.inteface';
import { Users } from '../../../services/users.service';
import { ModalityList } from '../../../models/users.interface';

@Component({
  selector: 'app-modality',
  templateUrl: './modality.component.html',
  styleUrl: './modality.component.scss',
})
export class ModalityComponent implements OnInit {
  data!: IRequestManager[];
  modalityList!: ModalityList[];
  ingredient!: string;
  visibleDialog = false;
  visibleDialogModality = false;
  message = '';
  parameter = [''];
  buttonmsg = '';
  modality_details!: ModalityList;
  enableAction: boolean = false;
  read_only: boolean = false;
  enableCreate: boolean = false;

  constructor(
    private userService: Users,
    private router: Router
  ) {}

  ngOnInit() {
    this.getModalityTable();
  }

  getModalityTable() {
    this.userService.getModalityList().subscribe({
      next: (response: BodyResponse<ModalityList[]>) => {
        if (response.code === 200) {
          this.modalityList = response.data;
          this.modalityList.forEach(item => {
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

  inActiveModality(modality_details: ModalityList) {
    if (!modality_details.is_active) {
      this.message = '¿Seguro que desea Inactivar modalidad?';
      this.visibleDialog = true;
      modality_details.is_active = 0;
    } else {
      this.message = '¿Seguro que desea Activar modalidad?';
      this.visibleDialog = true;
      modality_details.is_active = 1;
    }
    this.modality_details = modality_details;
  }
  displayModality(modality_details: ModalityList) {
    this.visibleDialogModality = true;
    this.buttonmsg = '';
    this.message = 'Detalles de modalidad';
    this.read_only = true;
    this.enableCreate = false;
    this.modality_details = modality_details;
  }
  editModality(modality_details: ModalityList) {
    this.visibleDialogModality = true;
    this.buttonmsg = 'Modificar';
    this.message = 'Modificar modalidad';
    this.read_only = false;
    this.enableCreate = false;
    this.modality_details = modality_details;
  }
  createModality() {
    this.visibleDialogModality = true;
    this.buttonmsg = 'Crear';
    this.message = 'Crear modalidad';
    this.read_only = false;
    this.enableCreate = true;
  }

  closeDialogModality(value: boolean) {
    this.visibleDialogModality = false;
    this.enableAction = value;
    if (value) {
      //
    }
  }
  setParameter(modality_details: ModalityList) {
    if (!this.enableAction || this.read_only) {
      return;
    } else if (this.enableCreate) {
      this.userService.createModality(modality_details).subscribe({
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
    } else {
      this.userService.modifyModality(modality_details).subscribe({
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
    this.ngOnInit();
  }

  closeDialog(value: boolean) {
    this.visibleDialog = false;
    if (value) {
      this.userService.inactivateModality(this.modality_details).subscribe({
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
    this.ngOnInit();
  }
}
