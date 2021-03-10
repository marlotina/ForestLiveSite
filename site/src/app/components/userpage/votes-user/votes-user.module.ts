import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VotesUserRoutingModule } from './votes-user-routing.module';
import { VotesUserComponent } from './votes-user.component';


@NgModule({
  declarations: [VotesUserComponent],
  imports: [
    CommonModule,
    VotesUserRoutingModule
  ]
})
export class VotesUserModule { }
