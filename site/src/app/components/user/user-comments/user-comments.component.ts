import { Component, OnInit } from '@angular/core';
import { CommentResponse } from 'src/app/model/Comment';
import { AccountService } from 'src/app/services/account/account.service';
import { CommentService } from 'src/app/services/comment/comment.service';

@Component({
  selector: 'app-user-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.css']
})
export class UserCommentsComponent implements OnInit {

  userComments: CommentResponse[];
  hasNotComments = false;

  constructor(private commentService: CommentService,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.commentService.GetCommentsByUser(this.accountService.userValue.userName).subscribe(
      data =>{ 
        if(data.length > 0){
          this.hasNotComments = true;
        }
        this.userComments = data;
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
