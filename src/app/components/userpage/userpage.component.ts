import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html'
})
export class UserpageComponent implements OnInit {

  constructor(private route: ActivatedRoute,
      private userService: UserService) { }

  ngOnInit(): void {
    const userName = this.route.snapshot.paramMap.get("username");




  }

}
