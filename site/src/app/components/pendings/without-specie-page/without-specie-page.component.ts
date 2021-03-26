import { Component, OnInit } from '@angular/core';
import { PostListResponse } from 'src/app/model/post';
import { SearchBirdsService } from 'src/app/services/searchs/search-birds.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-without-specie-page',
  templateUrl: './without-specie-page.component.html'
})
export class WithoutSpeciePageComponent implements OnInit {

  pendingPosts: PostListResponse[];
  imagesPostUrl = environment.imagesPostUrl;
  hasNotPosts = true;

  constructor(private searchBirdsService: SearchBirdsService) { }

  ngOnInit(): void {
    this.searchBirdsService.GetWithoutSpecie(1).subscribe(
      data =>{ 
        this.hasNotPosts = data.length > 0;
        this.pendingPosts = data;
      } 
    );
  }

}
