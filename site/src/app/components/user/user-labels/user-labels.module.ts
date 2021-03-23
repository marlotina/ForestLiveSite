import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLabelsRoutingModule } from './user-labels-routing.module';
import { UserLabelsComponent } from './user-labels.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UserLabelsComponent],
  imports: [
    CommonModule,
    UserLabelsRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserLabelsModule { }
