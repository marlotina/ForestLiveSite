import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthorDetailsComponent } from '../../shared/author-details/author-details.component';


@NgModule({
  declarations: [AuthorDetailsComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports:[AuthorDetailsComponent],
})
export class AuthorDetailsModule { }
