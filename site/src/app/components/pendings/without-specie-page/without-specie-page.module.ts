import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WithoutSpeciePageRoutingModule } from './without-specie-page-routing.module';
import { WithoutSpeciePageComponent } from './without-specie-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';

const materialModules = [
  MatIconModule,
];

@NgModule({
  declarations: [WithoutSpeciePageComponent],
  imports: [
    CommonModule,
    WithoutSpeciePageRoutingModule,
    SharedModule,
    materialModules
  ]
})
export class WithoutSpeciePageModule { }
