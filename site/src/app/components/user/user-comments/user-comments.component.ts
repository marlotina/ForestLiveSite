import { Component, OnInit } from '@angular/core';
import { CommentResponse } from 'src/app/model/Comment';
import { CommentVoteRequest } from 'src/app/model/vote';
import { AccountService } from 'src/app/services/account/account.service';
import { CommentService } from 'src/app/services/comment/comment.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-user-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.css']
})
export class UserCommentsComponent implements OnInit {

  userComments: CommentResponse[];
  hasNotComments = false;

  constructor(
    private loaderService: LoaderService,
    private commentService: CommentService,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.loaderService.show();
    this.commentService.GetCommentsByUser(this.accountService.userValue.userName).subscribe(
      data =>{ 
        if(data.length > 0){
          this.hasNotComments = true;
        }
        this.userComments = data;
        this.loaderService.hide();
      } 
    );
  }

  deleteComment(comment: CommentResponse){
    this.commentService.DeleteComment(comment.postId, comment.id).subscribe(
      data => {
        const index = this.userComments.indexOf(comment, 0);
        if (index > -1) {
          this.userComments.splice(index, 1);
        }
      });
  }
}
