import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalPostComponent } from '../modal-post/modal-post.component';
import { GoogleMapsModule } from '@angular/google-maps';

import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

const materialModules = [
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  ReactiveFormsModule,
  MatChipsModule,
  MatIconModule,
  MatSelectModule,
  MatAutocompleteModule
];


@NgModule({
  declarations: [
    LandingPageComponent,
    ModalPostComponent
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    LandingPageRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    materialModules
  ],
  exports:[materialModules],
  entryComponents: [ModalPostComponent]
})
export class LandingPageModule { }
