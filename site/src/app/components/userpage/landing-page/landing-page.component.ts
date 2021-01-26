import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html'
})

export class LandingPageComponent implements OnInit {
  submitted = false;
  
  buttonTitle:string = "AddPost"; 
  visible:boolean = false; 

  constructor() { 
  }

  ngOnInit(): void {
  }

  showhideutility(){ 
    this.visible = this.visible?false:true; 
    this.buttonTitle = this.visible?"Cancel":"AddPost"; 
  } 
}
