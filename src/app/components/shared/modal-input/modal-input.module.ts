import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalInputComponent } from './modal-input.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ModalInputComponent],
  imports: [CommonModule, DialogModule, ButtonModule, InputTextModule, FormsModule],
  exports: [ModalInputComponent],
})
export class ModalInputModule {}
