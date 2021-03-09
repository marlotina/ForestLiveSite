import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCommentsRoutingModule } from './user-comments-routing.module';
import { UserCommentsComponent } from './user-comments.component';


@NgModule({
  declarations: [UserCommentsComponent],
  imports: [
    CommonModule,
    UserCommentsRoutingModule
  ]
})
export class UserCommentsModule { }
