import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WithoutSpeciePageRoutingModule } from './without-specie-page-routing.module';
import { WithoutSpeciePageComponent } from './without-specie-page.component';


@NgModule({
  declarations: [WithoutSpeciePageComponent],
  imports: [
    CommonModule,
    WithoutSpeciePageRoutingModule
  ]
})
export class WithoutSpeciePageModule { }
