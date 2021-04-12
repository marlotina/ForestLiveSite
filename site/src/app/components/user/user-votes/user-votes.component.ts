import { Component, OnInit } from '@angular/core';
import { VoteResponse } from 'src/app/model/vote';
import { AccountService } from 'src/app/services/account/account.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { VoteService } from 'src/app/services/vote/vote.service';

@Component({
  selector: 'app-user-votes',
  templateUrl: './user-votes.component.html',
  styleUrls: ['./user-votes.component.css']
})
export class UserVotesComponent implements OnInit {

  userVotes: VoteResponse[];
  hasNotVotes = false;

  constructor(
    private loaderService: LoaderService,
    private votesService: VoteService,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.loaderService.show();
    this.votesService.GetVotesByUser(this.accountService.userValue.userName).subscribe(
      data =>{ 
        if(data.length > 0){
          this.hasNotVotes = true;
        }
        this.userVotes = data;
        this.loaderService.hide();
      } 
    );
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
