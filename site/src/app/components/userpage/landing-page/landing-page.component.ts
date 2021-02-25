import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostResponse } from 'src/app/model/post';
import { AccountService } from 'src/app/services/account/account.service';
import { PostService } from 'src/app/services/post/post.service';
import { environment } from 'src/environments/environment';
import { ShowChildFormService } from '../services/show-child-form.service';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html'
})

export class LandingPageComponent implements OnInit {
  
  submitted = false;
  
  subscription: Subscription;
  userPosts: PostResponse[];
  showAddPostButton = false;
  userId: string;
  imagesPostUrl = environment.imagesPostUrl;
  hasNotPosts: boolean;

  constructor(private showChildFormService: ShowChildFormService,
    private postService: PostService,
    private route: ActivatedRoute,
    private accountService: AccountService) { 

    this.subscription = this.showChildFormService.createdPost$.subscribe(
      data => {
        this.userPosts = [data].concat(this.userPosts)
    });

    this.route.paramMap.subscribe(params => {
      this.userId = params.get("userId");
      this.postService.GetPostsByUser(this.userId).subscribe(
        data =>{ 
          this.userPosts = data;
          this.hasNotPosts = this.userPosts.length == 0; 
        } 
      );
    });
    this.showAddPostButton = this.accountService.userValue != null && this.userId == this.accountService.userValue.userName;
  }

  ngOnInit(): void {
  }
}
