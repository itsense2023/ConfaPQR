import { Component, OnInit } from '@angular/core';
import { IRequestManager } from '../../../models/request-manager/request-manager.interface';

@Component({
  selector: 'app-request-manager',
  templateUrl: './request-manager.component.html',
  styleUrl: './request-manager.component.scss',
})
export class RequestManagerComponent implements OnInit {
  data!: IRequestManager[];

  constructor() {}

  ngOnInit() {
    this.data = this.generateTestData(10);
    console.log(this.data);
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

  ingredient!: string;
  visibleDialog = false;
  message = '';
  delete() {
    this.message = '¿Seguro que desea inactivar este responsable de solicitud?';
    this.visibleDialog = true;
  }

  closeDialog(value: boolean) {
    this.visibleDialog = false;
    if (value) {
      // accion de eliminar
    }
  }
}
