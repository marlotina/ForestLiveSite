import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserVotesRoutingModule } from './user-votes-routing.module';
import { UserVotesComponent } from './user-votes.component';


@NgModule({
  declarations: [UserVotesComponent],
  imports: [
    CommonModule,
    UserVotesRoutingModule
  ]
})
export class UserVotesModule { }
