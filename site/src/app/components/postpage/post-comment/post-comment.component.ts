import { Component , Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { CommentRequest, CommentResponse } from 'src/app/model/Comment';
import { CommentVoteRequest } from 'src/app/model/vote';
import { AccountService } from 'src/app/services/account/account.service';
import { CommentService } from 'src/app/services/comment/comment.service';
import { environment } from 'src/environments/environment';
import { CommonDialogComponent } from '../../shared/common-dialog/common-dialog.component';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent implements OnInit {

  @Input() postId: string;
  @Input() postTitle: string;
  @Input() specieId: string;
  @Input() userId: string;
  @Input() imageUrl: string;
  @Input() commentCount: number;

  comments: CommentResponse[] = [];
  imagesProfileUrl = environment.imagesProfileUrl;
  showFormList = new Map<string, boolean>();;
  userNameLogged = null;

  constructor(
    private commentService: CommentService,
    private accountService: AccountService,
    private matDialog: MatDialog) { 
    }

  showCommentForm(id: string){
    this.showFormList[id] = true;
  }

  ngOnInit(): void {
    this.userNameLogged = this.accountService != null? this.accountService.userValue.userId: null;

    this.commentService.GetCommentsByPost(this.postId).subscribe(
      data => { 
        this.comments = data 

        for(let i = 0; i < this.comments.length-1; i++)
        {
          this.showFormList.set(this.comments[i].id, false);
        }

      }
    );
  }


  addComment(parentComment: CommentResponse, text: string) {

    let commentRequest: CommentRequest = {
      postId: this.postId,
      titlePost: this.postTitle,
      AuthorPostId: this.userId,
      text: text,
      parentId: parentComment == null ? null : parentComment.id,
      specieId: this.specieId,
      userId: this.userNameLogged,
      ImagePost: this.imageUrl
    }

    this.commentService.AddComment(commentRequest)
        .pipe(first())
        .subscribe(
            data => {    
              if(parentComment == null){
                this.comments.push(data);
              }else{
                parentComment.replies.push(data);
                this.showFormList[parentComment.id] = false;
              }
              this.commentCount++;
            },
            error => {   
              if(error.status == "409"){
                this.openCommonModal('account.conflictNameMessage');
              } else {
                this.openCommonModal('user.failUserAction');
              } 
            });
  }

  deleteComment(comment: CommentResponse){
    this.commentService.DeleteComment(this.postId, comment.id).subscribe(
      data => {
        const index = this.comments.indexOf(comment, 0);
        if (index > -1) {
          this.comments.splice(index, 1);
        }
        this.commentCount--;
      },
      error => { 
        this.openCommonModal('failpostdelete');
      });
  }

  addVote(comment: CommentResponse){

    if(comment.hasVote){
      this.commentService.DeleteVote(comment.voteId, this.postId)
      .pipe(first())
          .subscribe(
              data => {    
                comment.voteCount--;
                comment.hasVote = false;
                comment.voteId = null;
              },
              error => {   
                
              });
    }else{
      let request: CommentVoteRequest = {
        postId: this.postId,
        text: comment.text,
        userId: this.userNameLogged,
        authorPostId: this.userId,
        commentId: comment.id
      };

      this.commentService.AddVote(request)
      .pipe(first())
          .subscribe(
              data => {    
                comment.voteCount++;
                comment.hasVote = true;
                comment.voteId = data.id;
              });
    }
  }

  showOwnerCommentOptions(userId: string){
    return this.userNameLogged == userId;
  }

  openCommonModal(message:string) {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "200px";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      title: "user.userTitleModal",
      description: message,
      acceptButtonText: "general.ok",
      hideAcceptButton: false,
      hideCancelButton: true
    }
    
    this.matDialog.open(CommonDialogComponent, dialogConfig);
  }
}
