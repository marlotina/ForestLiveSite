import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLabelsRoutingModule } from './user-labels-routing.module';
import { UserLabelsComponent } from './user-labels.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [UserLabelsComponent],
  imports: [
    CommonModule,
    SharedModule,
    UserLabelsRoutingModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class UserLabelsModule { }
