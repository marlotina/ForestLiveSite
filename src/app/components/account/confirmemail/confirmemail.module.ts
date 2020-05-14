import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmemailRoutingModule } from './confirmemail-routing.module';
import { ConfirmemailComponent } from './confirmemail.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ConfirmemailComponent],
  imports: [
    CommonModule,
    ConfirmemailRoutingModule,
    SharedModule
  ]
})
export class ConfirmemailModule { }
