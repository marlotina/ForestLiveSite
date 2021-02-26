import { Component, OnInit } from '@angular/core';
import { PostResponse } from 'src/app/model/post';
import { SearchBirdsService } from 'src/app/services/searchs/search-birds.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bird-landing-page',
  templateUrl: './bird-landing-page.component.html',
  styleUrls: ['./bird-landing-page.component.css']
})
export class BirdLandingPageComponent implements OnInit {

  birdPosts: PostResponse[];
  imagesPostUrl = environment.imagesPostUrl;

  constructor(private searchBirdsSerices: SearchBirdsService) { }

  ngOnInit(): void {
    this.searchBirdsSerices.GetBirdBySpecie("").subscribe(
      data =>{ 
        this.birdPosts = data;
      } 
    );
  }

}
