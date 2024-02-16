import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRequestRoutingModule } from './create-request-routing.module';
import { CreateRequestComponent } from './create-request.component';


@NgModule({
  declarations: [CreateRequestComponent],
  imports: [
    CommonModule,
    CreateRequestRoutingModule
  ],
  exports: [CreateRequestComponent
  ],
})
export class CreateRequestModule { }
