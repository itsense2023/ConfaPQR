import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsReportRoutingModule } from './requests-report-routing.module';
import { RequestsReportComponent } from './requests-report.component';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SharedModule } from '../../shared/shared.module';
@NgModule({
  declarations: [RequestsReportComponent],
  imports: [
    CommonModule,
    RequestsReportRoutingModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    DropdownModule,
    InputSwitchModule,
    SharedModule,
  ],
  exports: [RequestsReportComponent],
})
export class RequestsReportModule {}
