import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDinamicModule } from './modal-dinamic/modal-dinamic.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ModalDinamicModule],
  exports: [ModalDinamicModule],
})
export class SharedModule {}
