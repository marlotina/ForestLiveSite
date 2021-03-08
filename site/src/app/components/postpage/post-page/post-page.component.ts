import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/model/account';
import { CommentResponse } from 'src/app/model/Comment';
import { PostResponse } from 'src/app/model/post';
import { VoteRequest } from 'src/app/model/vote';
import { AccountService } from 'src/app/services/account/account.service';
import { CommentService } from 'src/app/services/comment/comment.service';
import { PostService } from 'src/app/services/post/post.service';
import { VoteService } from 'src/app/services/vote/vote.service';
import { environment } from 'src/environments/environment';
import { CommonDialogComponent } from '../../shared/common-dialog/common-dialog.component';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html'
})
export class PostPageComponent implements OnInit {
 
  commentForm: FormGroup;

  postId: string;
  post = new PostResponse();
  comments: CommentResponse[];
  imagesProfileUrl = environment.imagesProfileUrl;
  showOwnerOptions = false;
  postLabels: string[];
  imagePost: string;
  isLogged: boolean;
  userLoggedInfo: User;
  hasPost = false;
  constructor(private activateRoute: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private matDialog: MatDialog,
    private voteService: VoteService,
    private route: Router) { }

  ngOnInit(): void {

    this.commentForm = this.formBuilder.group({
      text: ['', [Validators.required]],
      userId: ['', [Validators.required]],
      postId: ['', [Validators.required]]
    });
    this.userLoggedInfo = this.accountService.userValue;
    this.isLogged = this.userLoggedInfo != null;
    
    this.activateRoute.paramMap.subscribe(params => {
      this.postId = params.get("id");
      this.postService.GetPost(this.postId).subscribe(
        data => { 
          this.post = data;  
          this.postLabels = data.labels;
          this.imagePost = environment.imagesPostUrl + data.imageUrl;
          this.showOwnerOptions = this.userLoggedInfo != null && this.post.userId == this.userLoggedInfo.userName;
          this.hasPost = true;
          this.commentForm.patchValue({
            'userId': this.userLoggedInfo != null ? this.userLoggedInfo.userName : '',
            'postId': this.post.id,
            });
        } 
      );
      this.commentService.GetCommentsByPost(this.postId).subscribe(
        data => { 
          this.comments = data 
        }
      );
    });
  }

  onSubmit() {
    if (this.commentForm.invalid) {
        return;
    }

    this.commentService.AddComment(this.commentForm.value)
        .pipe(first())
        .subscribe(
            data => {    
              this.openCommonModal('user.successSaveUserData');
              this.comments.push(data);
              this.post.commentCount++;
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

  addVote(post: PostResponse){
    let request: VoteRequest = {
      postId: post.postId,
      title: post.title,
      userId: this.userLoggedInfo.userName,
      vote: 1,
      ownerUserId: post.userId,
      specieId: post.specieId
    }
    this.voteService.AddVote(request)
      .pipe(first())
          .subscribe(
              data => {    
                this.post.voteCount++;
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

  deleteItem(){
    this.postService.DeletePost(this.post.postId).subscribe(
      data => {
        this.openCommonModal('postdeleted');
        this.route.navigate(['/userpage/' + this.post.userId]);
      },
      error => { 
        this.openCommonModal('failpostdelete');
      });
  }

  deleteComment(comment: CommentResponse){
    this.commentService.DeleteComment(comment.postId, comment.id).subscribe(
      data => {
        this.openCommonModal('postdeleted');
        const index = this.comments.indexOf(comment, 0);
        if (index > -1) {
          this.comments.splice(index, 1);
        }
        this.post.commentCount--;
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
