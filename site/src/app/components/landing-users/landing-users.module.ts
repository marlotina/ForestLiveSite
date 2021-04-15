import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingUsersRoutingModule } from './landing-users-routing.module';
import { LandingUsersComponent } from './landing-users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';

const materialModules = [
  MatInputModule,
  MatAutocompleteModule,
  MatIconModule
];

@NgModule({
  declarations: [LandingUsersComponent],
  imports: [
    CommonModule,
    SharedModule,
    LandingUsersRoutingModule,
    materialModules
  ]
})
export class LandingUsersModule { }
