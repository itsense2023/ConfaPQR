import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalityRoutingModule } from './modality-routing.module';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SharedModule } from '../../shared/shared.module';
import { ModalityComponent } from './modality.component';

@NgModule({
  declarations: [ModalityComponent],
  imports: [
    CommonModule,
    ModalityRoutingModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    DropdownModule,
    InputSwitchModule,
    SharedModule,
  ],
  exports: [ModalityComponent],
})
export class ModalityModule {}
