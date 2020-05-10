import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/Account';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {


  user: User;

  constructor(private translate: TranslateService,
    private accountService: AccountService) {  

    if(this.accountService.user){
      this.accountService.user.subscribe(x => this.user = x);
    }  
  }  

  logout() {
    this.accountService.logout();
  }

  ngOnInit(): void {
  }
}
