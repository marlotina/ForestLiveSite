import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'fl-site';
  pages = ["/login", "/signup", "/forgotpassword", "/resetpassword", "/confirmemail"];
  navExpand = false;
  isHome = false;
  constructor(
    private router: Router, 
    private route: ActivatedRoute) {
      //this.loadScript('../assets/js/bctools.js');

  }
  ngOnInit() {
    //this.loadScript('../assets/js/bctools.js');

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(res => {
      if (this.containUrl(this.router.url)) {//forgotpassword signup resetpassword confirmemail
        this.navExpand = false;
        this.isHome = true;
      } else {
        if(this.router.url == "/") {
          this.isHome = true;
          this.navExpand = false;
        }else{
          this.isHome = false;
          this.navExpand = true;
        }
      }
    });

  }

  
  containUrl(url: string){
    let result = false;
    this.pages.forEach(function(item, index){
      if(url.indexOf(item) >= 0){
        result = true;
      }
    });
    return result;
  }

 public loadScript(url: string) {
   const body = <HTMLDivElement> document.body;
   const script = document.createElement('script');
   script.innerHTML = '';
   script.src = url;
   script.async = false;
   script.defer = true;
   body.appendChild(script);
 }
}







