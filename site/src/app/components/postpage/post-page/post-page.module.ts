import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostPageRoutingModule } from './post-page-routing.module';
import { PostPageComponent } from './post-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SharedModule } from 'src/app/shared/shared.module';

const materialModules = [
  MatMenuModule, 
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatChipsModule,
  MatIconModule,
  MatSelectModule,
  MatAutocompleteModule
];


@NgModule({
  declarations: [PostPageComponent],
  imports: [
    CommonModule,
    PostPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    materialModules
  ]
})
export class PostPageModule { }
