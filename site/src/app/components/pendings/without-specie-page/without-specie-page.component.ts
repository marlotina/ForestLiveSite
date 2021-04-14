import { Component, OnInit } from '@angular/core';
import { PostListResponse } from 'src/app/model/post';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { PendingBirdService } from 'src/app/services/pendingBird/pending-bird.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-without-specie-page',
  templateUrl: './without-specie-page.component.html'
})
export class WithoutSpeciePageComponent implements OnInit {

  pendingPosts: PostListResponse[];
  imagesPostUrl = environment.imagesPostUrl;
  hasNotPosts: boolean;

  constructor(
    private pendingBirdService: PendingBirdService,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.pendingBirdService.GetWithoutSpecie(1).subscribe(
      data => {
        this.pendingPosts = data;
        if(data != null && data.length > 0){
          this.hasNotPosts = true;
        }else{
          this.hasNotPosts = false;
        }
        this.loaderService.hide();
      }
    );
  }

}
