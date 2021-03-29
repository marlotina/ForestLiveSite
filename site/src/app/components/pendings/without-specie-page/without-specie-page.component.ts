import { Component, OnInit } from '@angular/core';
import { PostListResponse } from 'src/app/model/post';
import { BirdserviceService } from 'src/app/services/bird/birdservice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-without-specie-page',
  templateUrl: './without-specie-page.component.html'
})
export class WithoutSpeciePageComponent implements OnInit {

  pendingPosts: PostListResponse[];
  imagesPostUrl = environment.imagesPostUrl;
  hasNotPosts = true;

  constructor(private searchBirdsService: BirdserviceService) { }

  ngOnInit(): void {
    this.searchBirdsService.GetWithoutSpecie(1).subscribe(
      data =>{ 
        this.hasNotPosts = data.length > 0;
        this.pendingPosts = data;
      } 
    );
  }

}
