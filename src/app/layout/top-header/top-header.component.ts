import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/model/Account';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html'
})
export class TopHeaderComponent implements OnInit {
  
  user: User;

  constructor(private translate: TranslateService) {  

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

  ngOnInit(): void {
  }

}
