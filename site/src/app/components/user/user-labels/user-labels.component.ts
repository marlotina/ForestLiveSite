import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { UserPostService } from 'src/app/services/user-post/user-post.service';

@Component({
  selector: 'app-user-labels',
  templateUrl: './user-labels.component.html',
  styleUrls: ['./user-labels.component.css']
})
export class UserLabelsComponent implements OnInit {

  uaserLabels: string[];
  hasNotLabels = false;

  constructor(private userPostService: UserPostService,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.userPostService.GetUserLabels(this.accountService.userValue.userName).subscribe(
      data =>{ 
        if(data.length > 0){
          this.hasNotLabels = true;
        }
        this.uaserLabels = data;
      } 
    );
  }

}
