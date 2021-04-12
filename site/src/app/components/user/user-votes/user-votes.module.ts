import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserVotesRoutingModule } from './user-votes-routing.module';
import { UserVotesComponent } from './user-votes.component';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [UserVotesComponent],
  imports: [
    CommonModule,
    SharedModule,
    UserVotesRoutingModule,
    MatIconModule
  ]
})
export class UserVotesModule { }
