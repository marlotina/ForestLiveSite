import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, ObservedValueOf } from 'rxjs';
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
  isLogged: Observable<boolean>;
  imageProfileUrl = environment.imagesProfileUrl;
  userImage : Observable<string>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService) { 
      this.userImage = this.accountService.userImageObservable();
      this.isLogged = this.accountService.userLoggedObservable();
    }

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
    }
  }  

  logout() {
    this.accountService.Logout();
    this.router.navigate([''], { relativeTo: this.route });
  }
}
