import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShowChildFormService } from '../services/show-child-form.service';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html'
})

export class LandingPageComponent implements OnInit {
  submitted = false;
  
  buttonTitle:string = "AddPost"; 
  visible:boolean = false; 
  subscription: Subscription;

  constructor(private showChildFormService: ShowChildFormService) { 

    this.subscription = this.showChildFormService.visibleFormCreatedPost$.subscribe(
      value => {
        this.showhideutility();
    });
  }

  ngOnInit(): void {
  }

  showhideutility(){ 
    this.visible = this.visible?false:true; 
    this.buttonTitle = this.visible?"Cancel":"AddPost"; 
  } 

  
}
