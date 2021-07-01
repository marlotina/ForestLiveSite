import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthorDetailsComponent } from '../../shared/author-details/author-details.component';


@NgModule({
  declarations: [AuthorDetailsComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[AuthorDetailsComponent],
})
export class AuthorDetailsModule { }
