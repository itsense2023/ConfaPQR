import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDinamicModule } from './modal-dinamic/modal-dinamic.module';
import { ModalInputModule } from './modal-input/modal-input.module';
import { ModalSelectorModule } from './modal-selector/modal-selector.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ModalDinamicModule, ModalInputModule, ModalSelectorModule],
  exports: [ModalDinamicModule, ModalInputModule, ModalSelectorModule],
})
export class SharedModule {}
