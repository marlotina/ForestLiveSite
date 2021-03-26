import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCommentsRoutingModule } from './user-comments-routing.module';
import { UserCommentsComponent } from './user-comments.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [UserCommentsComponent],
  imports: [
    CommonModule,
    UserCommentsRoutingModule,
    MatIconModule]
})
export class UserCommentsModule { }
