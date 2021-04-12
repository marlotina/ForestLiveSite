import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCommentsRoutingModule } from './user-comments-routing.module';
import { UserCommentsComponent } from './user-comments.component';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [UserCommentsComponent],
  imports: [
    CommonModule,
    SharedModule,
    UserCommentsRoutingModule,
    MatIconModule]
})
export class UserCommentsModule { }
