import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmaccountComponent } from './confirmaccount.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [ConfirmaccountComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule
  ]
})
export class ConfirmaccountModule { }
