import { Component, OnInit } from '@angular/core';
import { PostHomeResponse } from 'src/app/model/post';
import { AccountService } from 'src/app/services/account/account.service';
import { BirdserviceService } from 'src/app/services/bird/birdservice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lastObservations: PostHomeResponse[] = []
  userPageUrl: string = null;
  urlPostImage: string = environment.imagesPostUrl;

  constructor(
    private accountService: AccountService,
    private birdService: BirdserviceService
  ) { }

  ngOnInit(): void {
    if(this.accountService.user){
      
      this.accountService.user.subscribe(
        x => {
          if(x != null)
          {
            this.userPageUrl = `userpage/${x.userId}`;
          }
        }
      );
    }

    this.birdService.GetLastbirds().subscribe(
      data => {
        this.lastObservations = data;
      }
    )
  }

}
