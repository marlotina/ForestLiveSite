import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/Account';
import { AccountService } from 'src/app/services/account/account.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {

  user: User;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService) {  

    if(this.accountService.user){
      this.accountService.user.subscribe(x => this.user = x);
    }  
  }  

  logout() {
    this.accountService.logout();
    this.router.navigate([''], { relativeTo: this.route });
  }

  ngOnInit(): void {
  }
}
