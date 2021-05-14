import { Component, OnInit } from '@angular/core';
import { PostListResponse } from 'src/app/model/post';
import { GetItemsService } from 'src/app/services/items/get-items.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-without-specie-page',
  templateUrl: './without-specie-page.component.html'
})
export class WithoutSpeciePageComponent implements OnInit {

  pendingPosts: PostListResponse[];
  imagesPostUrl = environment.imagesPostUrl;
  hasPosts = false;

  constructor(
    private getItemService: GetItemsService,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.getItemService.GetWithoutSpecie(1).subscribe(
      data => {
        this.pendingPosts = data;
        if(data != null && data.length > 0){
          this.hasPosts = true;
        }
        this.loaderService.hide();
      }
    );
  }

}
