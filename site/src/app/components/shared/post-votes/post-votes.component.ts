import { Component, Input, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { PostListResponse } from 'src/app/model/post';
import { VoteRequest } from 'src/app/model/vote';
import { AccountService } from 'src/app/services/account/account.service';
import { VoteService } from 'src/app/services/vote/vote.service';

@Component({
  selector: 'app-post-votes',
  templateUrl: './post-votes.component.html',
  styleUrls: ['./post-votes.component.css']
})
export class PostVotesComponent implements OnInit {

  
  @Input() postId: string;
  @Input() titlePost: string;
  @Input() authorPostId: string;
  @Input() userId: string;
  @Input() voteCount: number;
  @Input() specieId: string;
  @Input() voteId: string;
  @Input() hasVote: boolean;
  
  constructor(
    private voteService: VoteService) { }

  ngOnInit(): void {
  }

  addVote(){

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
      let request: VoteRequest = {
        postId: this.postId,
        titlePost: this.titlePost,
        userId: this.userId,
        authorPostId: this.authorPostId,
        specieId: this.specieId
      };

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
