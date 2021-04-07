import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from  '@ngx-translate/core';
import { LoaderComponent } from '../components/shared/loader/loader.component';
import { SelectSpecieDialogComponent } from '../components/shared/select-specie-dialog/select-specie-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    TranslateModule,
    LoaderComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
