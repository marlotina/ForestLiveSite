import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/account';
import { AccountService } from 'src/app/services/account/account.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {

  user: User = null;
  isLogged: boolean = false;
  userNameMenu: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService) {  

    if(this.accountService.user){
      this.accountService.user.subscribe(
        x => {
          this.user = x;
          this.userNameMenu = this.user.userName;
        }
        );
      this.accountService.isLogged.subscribe(
        x => this.isLogged = x
        );
      this.userNameMenu = this.user != null ? this.user.userName : '';
    }
  }  

  logout() {
    this.accountService.Logout();
    this.router.navigate([''], { relativeTo: this.route });
  }

  ngOnInit(): void {
  }
}
