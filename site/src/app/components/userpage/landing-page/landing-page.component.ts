import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from 'src/app/model/account';
import { PostListResponse } from 'src/app/model/post';
import { UserLabelPageResponse } from 'src/app/model/user';
import { VoteRequest } from 'src/app/model/vote';
import { AccountService } from 'src/app/services/account/account.service';
import { PostService } from 'src/app/services/post/post.service';
import { UserPostService } from 'src/app/services/user-post/user-post.service';
import { UserLabelsService } from 'src/app/services/user/labels/user-labels.service';
import { VoteService } from 'src/app/services/vote/vote.service';
import { environment } from 'src/environments/environment';
import { CommonDialogComponent } from '../../shared/common-dialog/common-dialog.component';
import { ImageDialogComponent } from '../../shared/image-dialog/image-dialog.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html'
})

export class LandingPageComponent implements OnInit {
  
  submitted = false;
  
  userLoggedInfo: User;
  subscription: Subscription;
  userPosts: PostListResponse[];
  userId: string;
  imagesPostUrl = environment.imagesPostUrl;
  hasNotPosts: boolean;
  isLogged: boolean;
  userLabels: UserLabelPageResponse[];
  selectedLabel: UserLabelPageResponse = {
    id: null,
    postCount: 0 
  };

  searchPost = true;
  searchBirds = true;

  constructor(
    private postService: PostService,
    private activateRoute: ActivatedRoute,
    private accountService: AccountService,
    private voteService: VoteService,
    private userPostService: UserPostService,
    private userLabelsService: UserLabelsService,
    private matDialog: MatDialog) { 

    this.accountService.isLogged.subscribe(
      x => this.isLogged = x
      );
  }

  ngOnInit(): void {

    this.activateRoute.paramMap.subscribe(params => {
      this.userId = params.get("userId");
      this.searchPosts();   
    });

    this.userLoggedInfo = this.accountService.userValue;
    this.userLabelsService.GetUserLabels(this.userId).subscribe(
      data => {
        this.userLabels = data;
      }
    );;
  }

  toggleEditable(event) {
    if ( event.target.checked ) {
      console.log(event);
    }
  }

  searchWithLabels(label: UserLabelPageResponse) {
    if(this.selectedLabel != null && label.id == this.selectedLabel.id){
      this.selectedLabel = {
        id: null,
        postCount: 0 
      };
    } else {
      this.selectedLabel = label;
    }

    this.searchPosts();
  }

  searchPosts(){

    if(  this.searchPost &&  this.searchBirds){
      this.userPostService.getPostsByUser(this.userId).subscribe(
        data =>{ 
          this.userPosts = data;
          this.hasNotPosts = this.userPosts.length == 0; 
        } 
      );
    } else if(this.searchPost && !this.searchBirds){
      this.userPostService.getPostsByLabel(this.userId, '').subscribe(
        data =>{ 
          this.userPosts = data;
          this.hasNotPosts = this.userPosts.length == 0; 
        } 
      );
    } else if(!this.searchPost && this.searchBirds){
      this.userPostService.getBirdsByLabel(this.userId, '').subscribe(
        data =>{ 
          this.userPosts = data;
          this.hasNotPosts = this.userPosts.length == 0; 
        } 
      );
    }


  }

  showDeleteOption(userId){
    return this.userLoggedInfo != null && userId == this.userLoggedInfo.userName;
  }

  deletePost(post: PostListResponse){

    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      //title: "user.deleteTitlePostModal",
      description: "user.deleteTextPostModal",
      acceptButtonText: "general.delete",
      cancelButtonText:"general.cancel",
      hideAcceptButton: false,
      hideCancelButton: false
    }
      
    const dialogRef = this.matDialog.open(CommonDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'ACCEPT'){
        this.postService.deletePost(post.postId).subscribe(
          data => {
            const index = this.userPosts.indexOf(post, 0);
            if (index > -1) {
              this.userPosts.splice(index, 1);
            }
          },
          error => { 
            this.openCommonModal('failpostdelete');
          });
      }
    });
  }

  addVote(post: PostListResponse, hasVote: boolean){
    let request: VoteRequest = {
      postId: post.postId,
      titlePost: post.title,
      userId: this.userLoggedInfo.userName,
      authorPostUserId: post.userId,
      specieId: post.specieId
    }

    if(hasVote){
      this.voteService.DeleteVote(post.voteId, post.postId)
      .pipe(first())
          .subscribe(
              data => {    
                post.voteCount--;
                post.hasVote = false;
                post.voteId = null;
              },
              error => {   
                if(error.status == "409"){
                  this.openCommonModal('account.conflictNameMessage');
                } else {
                  this.openCommonModal('user.failUserAction');
                } 
              });
    }else{
      this.voteService.AddVote(request)
      .pipe(first())
          .subscribe(
              data => {    
                post.voteCount++;
                post.hasVote = true;
                post.voteId = data.id;
              },
              error => {   
                if(error.status == "409"){
                  this.openCommonModal('account.conflictNameMessage');
                } else {
                  this.openCommonModal('user.failUserAction');
                } 
              });
    }
    
  }

  openCommonModal(message:string) {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
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

  showImage(imageUrl: string) {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    
    dialogConfig.data = {
      image: this.imagesPostUrl + imageUrl
    }
    
    this.matDialog.open(ImageDialogComponent, dialogConfig);
  }
}
