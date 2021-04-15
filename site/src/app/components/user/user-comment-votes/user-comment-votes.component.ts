import { Component, OnInit } from '@angular/core';
import { CommentVoteResponse } from 'src/app/model/vote';
import { AccountService } from 'src/app/services/account/account.service';
import { CommentService } from 'src/app/services/comment/comment.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { VoteService } from 'src/app/services/vote/vote.service';

@Component({
  selector: 'app-user-comment-votes',
  templateUrl: './user-comment-votes.component.html',
  styleUrls: ['./user-comment-votes.component.css']
})
export class UserCommentVotesComponent implements OnInit {

  userVotes: CommentVoteResponse[];
  hasNotVotes = false;

  constructor(
    private loaderService: LoaderService,
    private votesService: VoteService,
    private commentService: CommentService,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.loaderService.show();
    this.votesService.GetCommentVotesByUser(this.accountService.userValue.userName).subscribe(
      data =>{ 
        if(data.length > 0){
          this.hasNotVotes = true;
        }
        this.userVotes = data;
        this.loaderService.hide();
      } 
    );
  }

  deleteVote(vote: CommentVoteResponse){
    this.commentService.DeleteVote(vote.id, vote.postId).subscribe(
      data => {
        if(data){
          const index = this.userVotes.indexOf(vote, 0);
          if (index > -1) {
            this.userVotes.splice(index, 1);
          }
        }
      }
    )
  }

}
