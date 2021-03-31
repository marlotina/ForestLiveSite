import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from  '@ngx-translate/core';
import { LoaderComponent } from '../components/shared/loader/loader.component';

@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    TranslateModule,
    LoaderComponent
  ]
})
export class SharedModule { }
