import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { DeleteFollowUserResquest, FollowUserRequest } from 'src/app/model/FollowUser';
import { UserInfoResponse } from 'src/app/model/user';
import { AccountService } from 'src/app/services/account/account.service';
import { FollowusersService } from 'src/app/services/follow/followusers.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserInteractionsService } from 'src/app/services/user-interactions/user-interactions.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent implements OnInit {

  userInfo = new UserInfoResponse();
  imagesProfileUrl = environment.imagesProfileUrl;
  userImage: string;
  hasFollow = false;
  isLoading = true;

  constructor(
    private loaderService: LoaderService,
    private userInteractionService: UserInteractionsService,
    private followuserService: FollowusersService,
    private accountService: AccountService,
    private route: ActivatedRoute) { 
      this.loaderService.show();
    }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      let userId = params.get("userId");
      this.userInteractionService.GetByUserName(userId).subscribe(
        data => { 
          this.userInfo = data; 
          this.userImage = `${environment.imagesProfileUrl}${data.photo}`; 
          this.loaderService.hide();
          this.isLoading = false;
        }
      );
    });
  }

  addFollow(){
    if(this.userInfo.hasFollow){
      let request: DeleteFollowUserResquest = {
        followId: this.userInfo.followId,
        followUserId: this.userInfo.userName
      };
      this.followuserService.DeleteFollow(request)
      .pipe(first())
          .subscribe(
              data => {    
                this.userInfo.hasFollow = false;
                this.userInfo.followerCount--;
                this.userInfo.followId = null;
              },
              error => {   
                
              });
    }else{
      let request: FollowUserRequest = {
        userId: this.accountService.userValue.userId,
        followUserId:  this.userInfo.userName
      };

      this.followuserService.AddFollow(request)
      .pipe(first())
          .subscribe(
              data => {    
                this.userInfo.hasFollow = true;
                this.userInfo.followerCount++;
                this.userInfo.followId = data.followerId;
              });
    }
  }
}
