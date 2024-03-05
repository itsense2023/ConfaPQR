import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessRequestRoutingModule } from './process-request-routing.module';
import { ProcessRequestComponent } from './process-request.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SharedModule } from '../../shared/shared.module';
import { ToastModule } from 'primeng/toast';
import { MultiSelectModule } from 'primeng/multiselect';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [ProcessRequestComponent],
  imports: [
    CommonModule,
    ProcessRequestRoutingModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    DropdownModule,
    InputSwitchModule,
    SharedModule,
    ToastModule,
    MultiSelectModule,
    TabViewModule,
  ],
  exports: [ProcessRequestComponent],
})
export class ProcessRequestModule {}
