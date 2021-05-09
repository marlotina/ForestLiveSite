import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { DeleteFollowUserResquest, FollowUserRequest } from 'src/app/model/FollowUser';
import { UserInfoResponse } from 'src/app/model/user';
import { AccountService } from 'src/app/services/account/account.service';
import { UserInteractionsService } from 'src/app/services/user-interactions/user-interactions.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html'
})
export class AuthorDetailsComponent implements OnInit {

  userInfo = new UserInfoResponse();
  imagesProfileUrl = environment.imagesProfileUrl;
  userImage: string;
  hasFollow = false;

  constructor(
    private userInteractionService: UserInteractionsService,
    private accountService: AccountService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      let userId = params.get("userId");
      this.userInteractionService.GetByUserName(userId).subscribe(
        data => { 
          this.userInfo = data; 
          this.userImage = `${environment.imagesProfileUrl}${data.photo}`;
        }
      );
    });
  }

  addFollow(){
    if(this.hasFollow){
      let request: DeleteFollowUserResquest = {
        UserId: this.accountService.userValue.userId,
        FollowUserId: this.userInfo.userName,
        Id: this.userInfo.followId
      };
      this.userInteractionService.DeleteFollow(request)
      .pipe(first())
          .subscribe(
              data => {    
                this.userInfo.hasFollow = false;
                this.userInfo.countVotes--;
                this.userInfo.followId = null;
              },
              error => {   
                
              });
    }else{
      let request: FollowUserRequest = {
        UserId: this.accountService.userValue.userId,
        FollowUserId:  this.userInfo.userName
      };

      this.userInteractionService.AddFollow(request)
      .pipe(first())
          .subscribe(
              data => {    
                this.userInfo.hasFollow = true;
                this.userInfo.countVotes++;
                this.userInfo.followId = data.FollowUserId;
              });
    }
  }
}
