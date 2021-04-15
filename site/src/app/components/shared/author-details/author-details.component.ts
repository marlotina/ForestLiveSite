import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInfoResponse } from 'src/app/model/user';
import { UserInteractionsService } from 'src/app/services/user-interactions/user-interactions.service';
import { UserService } from 'src/app/services/user/profile/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html'
})
export class AuthorDetailsComponent implements OnInit {

  userInfo = new UserInfoResponse();
  imagesProfileUrl = environment.imagesProfileUrl;
  userImage: string;

  constructor(
    private userInteractionService: UserInteractionsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      let userId = params.get("userId");
      this.userInteractionService.GetByUserName(userId).subscribe(
        data => { 
          this.userInfo = data; 
        
          if(data.photo == '' || data.photo == null){
            this.userImage = "../../../../assets/img/bg-img/profile.png";
          } else {
            this.userImage = `${environment.imagesProfileUrl}${data.photo}`;
          }
        }
      );
    });
  }

}
