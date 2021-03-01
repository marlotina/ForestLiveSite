import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/account';
import { PostResponse } from 'src/app/model/post';
import { AccountService } from 'src/app/services/account/account.service';
import { PostService } from 'src/app/services/post/post.service';
import { environment } from 'src/environments/environment';
import { CommonDialogComponent } from '../../shared/common-dialog/common-dialog.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html'
})

export class LandingPageComponent implements OnInit {
  
  submitted = false;
  
  userLoggedInfo: User;
  subscription: Subscription;
  userPosts: PostResponse[];
  userId: string;
  imagesPostUrl = environment.imagesPostUrl;
  hasNotPosts: boolean;

  constructor(
    private postService: PostService,
    private activateRoute: ActivatedRoute,
    private accountService: AccountService,
    private matDialog: MatDialog) { 

    this.activateRoute.paramMap.subscribe(params => {
      this.userId = params.get("userId");
      this.postService.GetPostsByUser(this.userId).subscribe(
        data =>{ 
          this.userPosts = data;
          this.hasNotPosts = this.userPosts.length == 0; 
        } 
      );
    });
  }

  ngOnInit(): void {
    this.userLoggedInfo = this.accountService.userValue;
  }

  showDeleteOption(userId){
    return this.userLoggedInfo != null && userId == this.userLoggedInfo.userName;
  }

  deleteItem(post: PostResponse){
    this.postService.DeletePost(post.postId).subscribe(
      data => {
        this.openCommonModal('postdeleted');
        const index = this.userPosts.indexOf(post, 0);
        if (index > -1) {
          this.userPosts.splice(index, 1);
        }
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
