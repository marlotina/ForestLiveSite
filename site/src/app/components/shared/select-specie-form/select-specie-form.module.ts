import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SelectSpecieFormComponent } from './select-specie-form.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const materialModules = [
  MatInputModule,
  MatAutocompleteModule
];

@NgModule({
  declarations: [
    SelectSpecieFormComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientJsonpModule,
    SharedModule,
    materialModules
  ],
  exports:[SelectSpecieFormComponent],
  entryComponents: []
})
export class SelectSpecieFormModule { }
