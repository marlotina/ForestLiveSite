
import { Component , Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { User } from 'src/app/model/account';
import { CommentRequest, CommentResponse } from 'src/app/model/Comment';
import { AccountService } from 'src/app/services/account/account.service';
import { CommentService } from 'src/app/services/comment/comment.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
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
  @Input() commentCount = 2;

  comments: CommentResponse[] = [];
  imagesProfileUrl = environment.imagesProfileUrl;
  showOwnerOptions = false;
  isLogged: boolean;
  userLoggedInfo: User;

  showForm: boolean[] = [];


  constructor(
    private loaderService: LoaderService,
    private commentService: CommentService,
    private accountService: AccountService,
    private matDialog: MatDialog) { 
      this.loaderService.show();
    }

  showCommentForm(id: number){
    this.showForm[id] = true;
  }

  ngOnInit(): void {

    this.commentService.GetCommentsByPost(this.postId).subscribe(
      data => { 
        this.comments = data 

        for(let i = 0; i < this.commentCount; i++)
        {
          this.showForm.push(false);
        }

      }
    );

    this.userLoggedInfo = this.accountService.userValue;
    this.isLogged = this.userLoggedInfo != null;
  }


  addComment(parentCommentId: string, text: string) {

    let commentRequest: CommentRequest = {
      postId: this.postId,
      titlePost: this.postTitle,
      authorPostUserId: this.userId,
      text: text,
      commentParentId: parentCommentId,
      specieId: this.specieId,
      userId: this.userId
    }

    this.commentService.AddComment(commentRequest)
        .pipe(first())
        .subscribe(
            data => {    
              this.comments.push(data);
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
    this.commentService.DeleteComment(comment.postId, comment.id).subscribe(
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

  showOwnerCommentOptions(userId: string){
    return this.userLoggedInfo != null && userId == this.userLoggedInfo.userName;
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
