import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDinamicModule } from './modal-dinamic/modal-dinamic.module';
import { ModalInputModule } from './modal-input/modal-input.module';
import { ModalSelectorModule } from './modal-selector/modal-selector.module';
import { ModalModalityModule } from './modal-modality/modal-modality.module';
import { ModalAssignSelectorModule } from './modal-assign-selector/modal-assign-selector.module';
import { ModalCategoryModule } from './modal-category/modal-category.module';
import { ModalAlertModule } from './modal-alert/modal-alert.module';
import { ModalDataTreatmentModule } from './modal-data-treatment/modal-data-treatment.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModalDinamicModule,
    ModalInputModule,
    ModalSelectorModule,
    ModalModalityModule,
    ModalCategoryModule,
    ModalAlertModule,
    ModalDataTreatmentModule,
  ],
  exports: [
    ModalDinamicModule,
    ModalInputModule,
    ModalSelectorModule,
    ModalModalityModule,
    ModalAssignSelectorModule,
    ModalCategoryModule,
    ModalAlertModule,
    ModalDataTreatmentModule,
  ],
})
export class SharedModule {}
