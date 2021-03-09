import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/account';
import { AccountService } from 'src/app/services/account/account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

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
    private accountService: AccountService,
    private translate: TranslateService
    ) {  

    translate.addLangs(['en', 'es', 'de']);  

    if (localStorage.getItem('locale')) {  
      const browserLang = localStorage.getItem('locale');  
      translate.use(browserLang.match(/en|de|es/) ? browserLang : 'en');  
    } else {  
      localStorage.setItem('locale', 'en');  
      translate.setDefaultLang('en');  
    }  

    if(this.accountService.user){
      
      this.accountService.user.subscribe(
        x => {
          if(x != null)
          {
            this.user = x;
            this.userNameMenu = this.user.userName;
          }
        }
      );

      this.accountService.isLogged.subscribe(
        x => this.isLogged = x
        );
        
      this.userNameMenu = this.user != null ? this.user.userName : '';
    }
  }  

  changeLang(language: string) {  
    localStorage.setItem('locale', language);  
    this.translate.use(language);  
  }

  logout() {
    this.accountService.Logout();
    this.router.navigate([''], { relativeTo: this.route });
  }

  ngOnInit(): void {
  }
}
