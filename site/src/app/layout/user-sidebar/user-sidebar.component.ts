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
  isLogged: boolean = false;
  imageProfileUrl = environment.imagesProfileUrl;
  userImage : Observable<string>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService) { 
    }

  ngOnInit(): void {
    this.userImage = this.accountService.userImageObservable();
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
