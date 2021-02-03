import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentResponse, PostResponse } from 'src/app/model/post';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html'
})
export class PostPageComponent implements OnInit {

  post: PostResponse;
  comments: CommentResponse[];

  constructor(private route: ActivatedRoute,
    private postService: PostService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let postId = params.get("id");
      this.postService.GetPost(postId).subscribe(
        data =>{ this.post = data; } 
      );
      this.postService.GetCommentsByPost(postId).subscribe(
        data => { this.comments = data }
      );
    });
  }

  AddComment() {

  }
}
