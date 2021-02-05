import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInfoResponse } from 'src/app/model/user';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html'
})
export class AuthorDetailsComponent implements OnInit {

  userInfo: UserInfoResponse;
  imagesProfileUrl = environment.imagesProfileUrl;
  showFacebook = false;
  showTwitter= false;
  showWebUrl = false;
  showInstagram = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      let userId = params.get("id");
      this.userService.GetByUserName(userId).subscribe(
        data => { 
          this.userInfo = data; 
          this.showFacebook = data.facebookUrl != "" && data.facebookUrl != null;
          this.showInstagram = data.instagramUrl != "" && data.instagramUrl != null;
          this.showTwitter = data.twitterUrl != "" && data.twitterUrl != null;
          this.showWebUrl = data.urlWebSite != "" && data.urlWebSite != null;
        
        }
      );
    });
  }

}
