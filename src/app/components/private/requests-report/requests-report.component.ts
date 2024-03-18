import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BodyResponse } from '../../../models/shared/body-response.inteface';
import { Users } from '../../../services/users.service';
import {
  Column,
  ExportColumn,
  IsPqrCatalog,
  RequestStatusList,
  RequestTypeList,
  RequestsList,
  UserList,
} from '../../../models/users.interface';
import * as FileSaver from 'file-saver';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-requests-report',
  templateUrl: './requests-report.component.html',
  styleUrl: './requests-report.component.scss',
})
export class RequestsReportComponent implements OnInit {
  requestList: RequestsList[] = [];
  ingredient!: string;
  visibleDialog = false;
  visibleDialogInput = false;
  message = '';
  buttonmsg = '';
  parameter = [''];
  request_details!: RequestTypeList;

  selectedProducts!: RequestsList[];
  cols!: Column[];

  exportColumns!: ExportColumn[];
  formGroup: FormGroup<any> = new FormGroup<any>({});
  rangeDates: Date[] | undefined;
  statusList: RequestStatusList[] = [];
  userList: UserList[] = [];
  ispqrList: IsPqrCatalog[] = [];
  constructor(
    private userService: Users,
    private router: Router,
    private messageService: MessageService
  ) {
    this.formGroup = new FormGroup({
      dates_range: new FormControl(null),
      request_status_id: new FormControl(null),
      assigned_user: new FormControl(null),
      is_pqr: new FormControl(null),
    });
  }

  ngOnInit() {
    this.getRequestStatusList();
    this.getRequestList();
    this.getUsersTable();
    this.cols = [
      { field: 'filing_number', header: 'Número de radicado', customExportHeader: 'Product Code' },
      { field: 'filing_date', header: 'Fecha de radicación' },
      { field: 'applicant_type_name', header: 'Tipo de solicitante' },
      { field: 'doc_id', header: 'Número de documento' },
      { field: 'applicant_name', header: 'Nombre empresa/Solicitante' },
      { field: 'request_type_name', header: 'Tipo de solicitud' },
      { field: 'status_name', header: 'Estado solicitud' },
      { field: 'request_days', header: 'Dias solicitud' },
      { field: 'assigned_user', header: 'Responsable solicitud' },
    ];

    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
    this.ispqrList = [
      {
        id: 1,
        name: 'Sí',
      },
      {
        id: 2,
        name: 'No',
      },
    ];
  }
  showSuccessMessage(state: string, title: string, message: string) {
    this.messageService.add({ severity: state, summary: title, detail: message });
  }
  getRequestStatusList() {
    this.userService.getRequestStatusList().subscribe({
      next: (response: BodyResponse<RequestStatusList[]>) => {
        if (response.code === 200) {
          this.statusList = response.data; //.filter(obj => obj.is_active !== 0);
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
  getUsersTable() {
    this.userService.getUsersList().subscribe({
      next: (response: BodyResponse<UserList[]>) => {
        if (response.code === 200) {
          this.userList = response.data;
          this.userList.forEach(item => {
            item.is_active = item.is_active === 1 ? true : false;
          });
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
  cleanForm() {
    console.log('clean');
    this.formGroup.reset();
  }
  searhRequests() {
    console.log(this.formGroup.value);
  }
  exportPdf() {
    import('jspdf').then(jsPDF => {
      import('jspdf-autotable').then(x => {
        const doc = new jsPDF.default('p', 'px', 'a4');
        (doc as any).autoTable(this.exportColumns, this.requestList);
        doc.save('products.pdf');
      });
    });
  }

  exportExcel() {
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.requestList);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'products');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
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
  assignRequest(request_details: RequestsList) {
    this.message = 'Asignar responsable al requerimiento';
    this.visibleDialogInput = true;
    this.buttonmsg = 'Asignar';
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
  setParameter(inputValue: string) {
    console.log(inputValue);
    /*this.userService.createRequestType(inputValue).subscribe({
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
    });*/
  }
}
