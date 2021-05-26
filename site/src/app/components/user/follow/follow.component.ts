import { Component, OnInit } from '@angular/core';
import { FollowListResponse } from 'src/app/model/FollowUser';
import { AccountService } from 'src/app/services/account/account.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserInteractionsService } from 'src/app/services/user-interactions/user-interactions.service';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {


  follows: FollowListResponse[];
  hasFollows = false;
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
          this.hasFollows = true;
        }
        this.follows = data;
        this.loaderService.hide();
        this.isLoading = false;
      } 
    );
  }
}