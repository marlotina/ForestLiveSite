import { Component, OnInit } from '@angular/core';
import { UserListResponse } from 'src/app/model/user';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserInteractionsService } from 'src/app/services/user-interactions/user-interactions.service';

@Component({
  selector: 'app-landing-users',
  templateUrl: './landing-users.component.html',
  styleUrls: ['./landing-users.component.css']
})
export class LandingUsersComponent implements OnInit {

  users: UserListResponse[] =[];
  constructor(
    private userInteractionsService: UserInteractionsService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.loaderService.show();
    this.userInteractionsService.GetUsers().subscribe(
      data=> {
        this.users = data;
        this.loaderService.hide();
      }
    )
  }

}
