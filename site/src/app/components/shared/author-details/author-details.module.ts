import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthorDetailsComponent } from '../../shared/author-details/author-details.component';


@NgModule({
  declarations: [AuthorDetailsComponent],
  imports: [
    CommonModule
  ],
  exports:[AuthorDetailsComponent],
})
export class AuthorDetailsModule { }
