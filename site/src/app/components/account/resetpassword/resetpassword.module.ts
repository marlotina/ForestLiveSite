import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetpasswordRoutingModule } from './resetpassword-routing.module';
import { ResetpasswordComponent } from './resetpassword.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [ResetpasswordComponent],
  imports: [
    CommonModule,
    ResetpasswordRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ]
})
export class ResetpasswordModule { }
