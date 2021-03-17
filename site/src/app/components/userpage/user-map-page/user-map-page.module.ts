import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserMapPageRoutingModule } from './user-map-page-routing.module';
import { UserMapPageComponent } from './user-map-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthorDetailsModule } from '../../shared/author-details/author-details.module';




@NgModule({
  declarations: [UserMapPageComponent],
  imports: [
    CommonModule,
    UserMapPageRoutingModule,
    SharedModule,
    AuthorDetailsModule
  ]
})
export class UserMapPageModule { }
