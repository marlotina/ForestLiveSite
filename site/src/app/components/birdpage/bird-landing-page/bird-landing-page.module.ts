import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BirdLandingPageRoutingModule } from './bird-landing-page-routing.module';
import { BirdLandingPageComponent } from './bird-landing-page.component';

import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

const materialModules = [
  MatSelectModule,
  MatAutocompleteModule
];


@NgModule({
  declarations: [BirdLandingPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BirdLandingPageRoutingModule,
    materialModules
  ]
})
export class BirdLandingPageModule { }
