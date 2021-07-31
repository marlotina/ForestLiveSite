import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userName: string = null;
  isLogged: Observable<boolean>;
  constructor(private accountService: AccountService) {
    this.isLogged = this.accountService.userLoggedObservable(); }

  ngOnInit(): void {
    if(this.accountService.user){
      this.accountService.user.subscribe(
        x => {
          if(x != null)
          {
            this.userName = x.userId;
          }
          else
          {
            this.userName = null;
          }
        }
      );
    }
  }

}
