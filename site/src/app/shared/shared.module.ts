import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from  '@ngx-translate/core';
import { AuthorDetailsModule } from '../components/shared/author-details/author-details.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    TranslateModule
  ]
})
export class SharedModule { }
