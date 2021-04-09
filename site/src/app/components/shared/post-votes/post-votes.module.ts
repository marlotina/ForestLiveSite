import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PostVotesComponent } from './post-votes.component';



@NgModule({
  declarations: [PostVotesComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports:[PostVotesComponent]
})
export class PostVotesModule { }
