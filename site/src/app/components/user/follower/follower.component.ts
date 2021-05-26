import { Component, OnInit } from '@angular/core';
import { FollowListResponse } from 'src/app/model/FollowUser';
import { AccountService } from 'src/app/services/account/account.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserInteractionsService } from 'src/app/services/user-interactions/user-interactions.service';

@Component({
  selector: 'app-follower',
  templateUrl: './follower.component.html',
  styleUrls: ['./follower.component.css']
})
export class FollowerComponent implements OnInit {


  followers: FollowListResponse[];
  hasFollowers = false;
  isLoading = true;
  constructor(
    private loaderService: LoaderService,
    private userInteractionsService: UserInteractionsService,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.loaderService.show();
    this.userInteractionsService.GetFollowerByUserId(this.accountService.userValue.userId).subscribe(
      data =>{ 
        if(data.length > 0){
          this.hasFollowers = true;
        }
        this.followers = data;
        this.loaderService.hide();
        this.isLoading = false;
      } 
    );
  }

 /* deleteComment(comment: FollowListResponse){
    this.userInteractionsService.DeleteFollow()).subscribe(
      data => {
        const index = this.userComments.indexOf(comment, 0);
        if (index > -1) {
          this.userComments.splice(index, 1);
        }
      });
  }*/
}