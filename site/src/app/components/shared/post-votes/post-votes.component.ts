import { Component, Input, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { PostListResponse } from 'src/app/model/post';
import { VoteRequest } from 'src/app/model/vote';
import { VoteService } from 'src/app/services/vote/vote.service';

@Component({
  selector: 'app-post-votes',
  templateUrl: './post-votes.component.html',
  styleUrls: ['./post-votes.component.css']
})
export class PostVotesComponent implements OnInit {

  
  @Input() postId: string;
  @Input() titlePost: string;
  @Input() authorPostUserId: string;
  @Input() userId: string;
  @Input() voteCount: number;
  @Input() specieId: string;
  @Input() voteId: string;
  @Input() hasVote: boolean;
  
  constructor(
    private voteService: VoteService
  ) { }

  ngOnInit(): void {
  }

  addVote(){
    let request: VoteRequest = {
      postId: this.postId,
      titlePost: this.titlePost,
      userId: this.userId,
      authorPostUserId: this.userId,
      specieId: this.specieId
    }

    if(this.hasVote){
      this.voteService.DeleteVote(this.voteId, this.postId)
      .pipe(first())
          .subscribe(
              data => {    
                this.voteCount--;
                this.hasVote = false;
                this.voteId = null;
              },
              error => {   
                
              });
    }else{
      this.voteService.AddVote(request)
      .pipe(first())
          .subscribe(
              data => {    
                this.voteCount++;
                this.hasVote = true;
                this.voteId = data.id;
              });
    }
    
  }

}
