import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/account';
import { AccountService } from 'src/app/services/account/account.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  user: User = null;
  userNameMenu: string;
  userImage: string;
  imageProfileUrl = environment.imagesProfileUrl;
  navExpand = false;
  isLogged: Observable<boolean>;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private translate: TranslateService
  ) {  
    
    this.isLogged = this.accountService.userLoggedObservable();
    translate.addLangs(['en', 'es', 'de']);  

    if (localStorage.getItem('locale')) {  
      const browserLang = localStorage.getItem('locale');  
      translate.use(browserLang.match(/en|de|es/) ? browserLang : 'en');  
    } else {  
      localStorage.setItem('locale', 'en');  
      translate.setDefaultLang('en');  
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
