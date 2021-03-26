import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CreatePostComponent } from '../create-post/create-post.component';
import { ModalEditImageComponent } from '../modal-edit-image/modal-edit-image.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CreatePostRoutingModule } from './create-post-routing.module';
import {MatTooltipModule} from '@angular/material/tooltip';

const materialModules = [
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatChipsModule,
  MatIconModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatTooltipModule
];

@NgModule({
  declarations: [
    CreatePostComponent,
    ModalEditImageComponent
  ],
  imports: [
    CommonModule,
    CreatePostRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    materialModules
  ],
  entryComponents: [CreatePostComponent, ModalEditImageComponent]
})
export class CreatePostModule { }
