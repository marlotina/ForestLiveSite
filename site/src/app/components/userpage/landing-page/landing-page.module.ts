import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthorDetailsModule } from '../../shared/author-details/author-details.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PostVotesModule } from '../../shared/post-votes/post-votes.module';


const materialModules = [
  MatMenuModule, 
  MatButtonModule,
  MatIconModule,
];

@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    SharedModule,
    AuthorDetailsModule,
    PostVotesModule,
    materialModules
  ]
})
export class LandingPageModule { }
