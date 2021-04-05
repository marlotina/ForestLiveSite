
import { Component , Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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

  @Input() postId;
  @Input() postTitle;
  @Input() specieId;
  @Input() userId;
  @Input() commentCount = 2;
  commentForm: FormGroup;
  comments: CommentResponse[] = [];
  imagesProfileUrl = environment.imagesProfileUrl;
  showOwnerOptions = false;
  isLogged: boolean;
  userLoggedInfo: User;

  showForm: boolean[] = [];


  constructor(
    private loaderService: LoaderService,
    private commentService: CommentService,
    private formBuilder: FormBuilder,
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

  

    console.log(this.postId) 
    this.userLoggedInfo = this.accountService.userValue;
    this.isLogged = this.userLoggedInfo != null;
    
    
      
  }


  onSubmit(parentCommentId: string, text: string) {

    let commentRequest: CommentRequest = {
      postId: this.postId,
      titlePost: this.postTitle,
      authorPostUserId: this.userId,
      text: text,
      parentCommentId: parentCommentId,
      specieId: this.specieId,
      userId: this.userId
    }

    this.commentService.AddComment(commentRequest)
        .pipe(first())
        .subscribe(
            data => {    
              this.comments.push(data);
              //this.post.commentCount++;
              this.commentForm.controls.text.setValue('');
            },
            error => {   
              if(error.status == "409"){
                this.openCommonModal('account.conflictNameMessage');
                this.commentForm.controls.userName.setErrors({'incorrect': true});
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
        //this.post.commentCount--;
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
