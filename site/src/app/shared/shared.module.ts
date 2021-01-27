import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from  '@ngx-translate/core';
import { ImageCropperModule } from 'ngx-image-cropper';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ImageCropperModule
  ],
  exports: [
    CommonModule,
    TranslateModule
]
})
export class SharedModule { }
