import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDinamicModule } from './modal-dinamic/modal-dinamic.module';
import { ModalInputModule } from './modal-input/modal-input.module';
import { ModalSelectorModule } from './modal-selector/modal-selector.module';
import { ModalModalityModule } from './modal-modality/modal-modality.module';
import { ModalAssignSelectorModule } from './modal-assign-selector/modal-assign-selector.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModalDinamicModule,
    ModalInputModule,
    ModalSelectorModule,
    ModalModalityModule,
  ],
  exports: [
    ModalDinamicModule,
    ModalInputModule,
    ModalSelectorModule,
    ModalModalityModule,
    ModalAssignSelectorModule,
  ],
})
export class SharedModule {}
