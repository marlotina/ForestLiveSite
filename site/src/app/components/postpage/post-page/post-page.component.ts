import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { CommentResponse } from 'src/app/model/Comment';
import { DeletePost, PostResponse } from 'src/app/model/post';
import { AccountService } from 'src/app/services/account/account.service';
import { CommentService } from 'src/app/services/comment/comment.service';
import { PostService } from 'src/app/services/post/post.service';
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

  constructor(private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    let userLoggedInfo = this.accountService.userValue;
    this.isLogged = userLoggedInfo != null;
    this.route.paramMap.subscribe(params => {
      this.postId = params.get("id");
      this.postService.GetPost(this.postId).subscribe(
        data => { 
          this.post = data;  
          this.postLabels = data.labels;
          this.imagePost = environment.imagesPostUrl + data.imageUrl;
          this.showOwnerOptions = userLoggedInfo != null && this.post.userId == userLoggedInfo.userName;
        } 
      );
      this.commentService.GetCommentsByPost(this.postId).subscribe(
        data => { 
          this.comments = data 
        }
      );
    });

    this.commentForm = this.formBuilder.group({
      text: ['', [Validators.required]],
      userId: ['', [Validators.required]],
      postId: ['', [Validators.required]]
    });

    this.commentForm.patchValue({
      'userId': this.accountService.userValue != null ? this.accountService.userValue.userName : '',
      'postId': this.postId
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
        this.accountService.Logout();
      },
      error => { 
        this.openCommonModal('failpostdelete');
      });
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
