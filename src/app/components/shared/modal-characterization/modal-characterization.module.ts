import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ModalCharacterizationComponent } from './modal-characterization.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [ModalCharacterizationComponent],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    DropdownModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  exports: [ModalCharacterizationComponent],
})
export class ModalCharacterizationModule {}
