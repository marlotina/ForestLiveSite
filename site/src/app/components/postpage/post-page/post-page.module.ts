import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostPageRoutingModule } from './post-page-routing.module';
import { PostPageComponent } from './post-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthorDetailsModule } from '../../shared/author-details/author-details.module';
import { PostCommentModule } from '../post-comment/post-comment.module';

const materialModules = [
  MatMenuModule, 
  MatButtonModule,
  MatIconModule,
];


@NgModule({
  declarations: [PostPageComponent],
  imports: [
    CommonModule,
    PostCommentModule,
    PostPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AuthorDetailsModule,
    materialModules
  ]
})
export class PostPageModule { }
