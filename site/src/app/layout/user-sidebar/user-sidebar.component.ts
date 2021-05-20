import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/account';
import { AccountService } from 'src/app/services/account/account.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  user: User = null;
  isLogged: boolean = false;
  imageProfileUrl = environment.imagesProfileUrl;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService) { }

  ngOnInit(): void {
    if(this.accountService.user){
      
      this.accountService.user.subscribe(
        x => {
          if(x != null)
          {
            this.user = x;
          }
        }
      );

      this.accountService.isLogged.subscribe(
        x => this.isLogged = x
        );
    }
  }  

  logout() {
    this.accountService.Logout();
    this.router.navigate([''], { relativeTo: this.route });
  }
}
