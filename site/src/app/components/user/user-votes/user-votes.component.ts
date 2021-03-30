import { Component, OnInit } from '@angular/core';
import { VoteResponse } from 'src/app/model/vote';
import { AccountService } from 'src/app/services/account/account.service';
import { VoteService } from 'src/app/services/vote/vote.service';

@Component({
  selector: 'app-user-votes',
  templateUrl: './user-votes.component.html',
  styleUrls: ['./user-votes.component.css']
})
export class UserVotesComponent implements OnInit {

  userVotes: VoteResponse[];
  hasNotVotes = false;

  constructor(private votesService: VoteService,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.votesService.GetVotesByUser(this.accountService.userValue.userName).subscribe(
      data =>{ 
        if(data.length > 0){
          this.hasNotVotes = true;
        }
        this.userVotes = data;
      } 
    );
  }

  getUrl(vote: VoteResponse) {
    if(vote.specieId != null){
        return `${vote.userId}/bird/${vote.postId}/${vote.specieId}`;
    }else{
      return `${vote.userId}/post/${vote.postId}`;
    }
  }

  deleteVote(vote: VoteResponse){
    this.votesService.DeleteVote(vote.id, vote.postId).subscribe(
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
