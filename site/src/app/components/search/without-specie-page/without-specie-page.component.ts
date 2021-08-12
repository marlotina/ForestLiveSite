import { Component, OnInit } from '@angular/core';
import { PostListResponse } from 'src/app/model/post';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { GetpostService } from 'src/app/services/posts/getpost.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-without-specie-page',
  templateUrl: './without-specie-page.component.html',
  styleUrls: ['./without-specie-page.component.css']
})
export class WithoutSpeciePageComponent implements OnInit {

  pendingPosts: PostListResponse[];
  imagesPostUrl = environment.imagesPostUrl;
  imagesProfileUrl = environment.imagesProfileUrl;
  hasPosts = false;

  constructor(
    private getItemService: GetpostService,
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
