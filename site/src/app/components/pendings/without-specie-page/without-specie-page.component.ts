import { Component, OnInit } from '@angular/core';
import { BirdSpeciePostResponse } from 'src/app/model/post';
import { BirdsService } from 'src/app/services/birds/birds.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-without-specie-page',
  templateUrl: './without-specie-page.component.html'
})
export class WithoutSpeciePageComponent implements OnInit {

  pendingPosts: BirdSpeciePostResponse[];
  imagesPostUrl = environment.imagesPostUrl;
  hasNotPosts = false;

  constructor(private birdService: BirdsService) { }

  ngOnInit(): void {
    this.birdService.GetWithoutSpecie().subscribe(
      data =>{ 
        if(data.length > 0){
          this.hasNotPosts = true;
        }
        this.pendingPosts = data;
        
      } 
    );
  }

}
