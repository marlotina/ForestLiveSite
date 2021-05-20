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
  constructor(
    private router: Router, 
    private route: ActivatedRoute) {

  }
  ngOnInit() {
    //this.loadScript('../assets/js/active.js');

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(res => {
      if (this.pages.includes(this.router.url)) {//forgotpassword signup resetpassword confirmemail
        this.navExpand = false;
      } else {
        this.navExpand = true;
      }
    });

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







