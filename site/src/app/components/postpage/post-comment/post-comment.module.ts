import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthorDetailsModule } from '../../shared/author-details/author-details.module';
import { PostCommentComponent } from './post-comment.component';

const materialModules = [
  MatMenuModule, 
  MatButtonModule,
  MatIconModule,
];


@NgModule({
  declarations: [PostCommentComponent],
  imports: [
    CommonModule,
    SharedModule,
    AuthorDetailsModule,
    materialModules
  ],
  exports: [PostCommentComponent]
})
export class PostCommentModule { }
