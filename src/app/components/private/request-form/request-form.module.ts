import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestFormComponent } from './request-form.component';
import { RequestFormRoutingModule } from './request-form-routing.module';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [RequestFormComponent],
  imports: [
    CommonModule,
    RequestFormRoutingModule,
    CardModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule,
    TableModule,
    ToastModule,
  ],
  exports: [RequestFormComponent],
})
export class RequestFormModule {}
