import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BodyResponse } from '../../../models/shared/body-response.inteface';
import { Users } from '../../../services/users.service';
import {
  ApplicantAttach,
  RequestHistoric,
  RequestsDetails,
  RequestsList,
} from '../../../models/users.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrl: './request-details.component.scss',
})
export class RequestDetailsComponent implements OnInit {
  requestList: RequestsList[] = [];
  requestDetails?: RequestsDetails;
  requestHistoric: RequestHistoric[] = [];
  requestHistoricAttach: RequestHistoric[] = [];
  ingredient!: string;
  visibleDialog = false;
  visibleDialogInput = false;
  visibleDialogAlert = false;
  message = '';
  message2 = '';
  buttonmsg = '';
  parameter = [''];
  request_details?: RequestsDetails;
  selectedRequests: RequestsList[] = [];
  request_id: number = 0;
  tabWidth!: number;
  ApplicantAttach: ApplicantAttach[] = [];
  informative: boolean = false;
  severity = '';
  constructor(
    private userService: Users,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.request_id = +params['id'];
    });
    this.getRequestDetails(this.request_id);
    this.getRequestHistoric(this.request_id);
  }
  showSuccessMessage(state: string, title: string, message: string) {
    this.messageService.add({ severity: state, summary: title, detail: message });
  }
  preprocessAttachments(applicantAttachments: string[]) {
    const newData = JSON.parse(JSON.stringify(applicantAttachments));
    applicantAttachments.forEach((attachmentUrl, index) => {
      const parts: string[] = attachmentUrl.split('/');
      const filename: string = parts[parts.length - 1];
      const filenameParts: string[] = filename.split('@');
      const fileSize: string = filenameParts[filenameParts.length - 1];
      const fileNameWithoutSize: string = filenameParts.slice(0, -1).join('@');
      const lastDotIndex: number = fileNameWithoutSize.lastIndexOf('.');
      const fileName: string = fileNameWithoutSize.slice(0, lastDotIndex);
      const fileExt: string = fileNameWithoutSize.slice(lastDotIndex + 1);
      this.ApplicantAttach[index] = {
        url: attachmentUrl.split('@')[0],
        fileName: fileNameWithoutSize,
        fileSize: fileSize,
        fileExt: fileExt,
      };
    });
  }
  getRequestDetails(request_id: number) {
    this.userService.getRequestDetails(request_id).subscribe({
      next: (response: BodyResponse<RequestsDetails>) => {
        if (response.code === 200) {
          this.requestDetails = response.data;
          console.log(this.requestDetails);
          this.preprocessAttachments(this.requestDetails['applicant_attachments']);
          console.log('ApplicantAttach', this.ApplicantAttach);
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
  getRequestHistoric(request_id: number) {
    this.userService.getRequestHistoric(request_id).subscribe({
      next: (response: BodyResponse<RequestHistoric[]>) => {
        if (response.code === 200) {
          //this.requestHistoric = response.data;
          console.log(response.data);
          this.requestHistoricAttach = response.data.filter(
            item => item.action === 'Archivos adjuntos'
          );
          this.requestHistoric = response.data.filter(item => item.action !== 'Archivos adjuntos');
          console.log(this.requestHistoric);
          console.log(this.requestHistoricAttach);
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

  assignRequest(request_details: RequestsDetails) {
    if (request_details.assigned_user == null || request_details.assigned_user == '') {
      this.message = 'Asignar responsable al requerimiento';
      this.buttonmsg = 'Asignar';
    } else {
      this.message = 'Reasignar responsable al requerimiento';
      this.buttonmsg = 'Reasignar';
    }
    this.visibleDialogInput = true;
    this.parameter = ['Usuario'];
    this.request_details = request_details;
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
    if (!this.request_details) return;
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
  downloadFile(download_url: string) {
    const anchor = document.createElement('a');
    anchor.href = download_url;
    anchor.click();
  }
}
