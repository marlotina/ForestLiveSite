import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingUsersRoutingModule } from './landing-users-routing.module';
import { LandingUsersComponent } from './landing-users.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [LandingUsersComponent],
  imports: [
    CommonModule,
    SharedModule,
    LandingUsersRoutingModule
  ]
})
export class LandingUsersModule { }
