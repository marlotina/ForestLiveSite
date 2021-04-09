import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PostListResponse } from 'src/app/model/post';
import { UserLabelPageResponse } from 'src/app/model/user';
import { AccountService } from 'src/app/services/account/account.service';
import { ManageItemsService } from 'src/app/services/items/manage-items.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserPostService } from 'src/app/services/user-post/user-post.service';
import { UserLabelsService } from 'src/app/services/user/labels/user-labels.service';
import { environment } from 'src/environments/environment';
import { CommonDialogComponent } from '../../shared/common-dialog/common-dialog.component';
import { ImageDialogComponent } from '../../shared/image-dialog/image-dialog.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html'
})

export class LandingPageComponent implements OnInit {
  
  submitted = false;
  
  userLoggedName: string = null;
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

  searchType:string = 'all';

  constructor(
    private loaderService: LoaderService,
    private activateRoute: ActivatedRoute,
    private accountService: AccountService,
    private manageItemService: ManageItemsService,
    private userPostService: UserPostService,
    private userLabelsService: UserLabelsService,
    private matDialog: MatDialog) { 

    this.loaderService.show();
    this.accountService.isLogged.subscribe(
      x => this.isLogged = x
      );
  }

  ngOnInit(): void {

    this.activateRoute.paramMap.subscribe(params => {
      this.userId = params.get("userId");
      this.searchPosts();   
    });

    this.userLoggedName = this.accountService.userValue.userName;
    this.userLabelsService.GetUserLabels(this.userId).subscribe(
      data => {
        this.userLabels = data;
      }
    );;
  }

  changeSearchType(e: any){
    this.searchType = e.target.value;
    this.searchPosts();
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
    this.userPostService.GetPosts(this.userId, this.selectedLabel.id, this.searchType).subscribe(
      data =>{ 
        this.userPosts = data;
        this.hasNotPosts = this.userPosts.length == 0; 
        this.loaderService.hide();
      } 
    );
  }

  showDeleteOption(userId: string){
    return this.userLoggedName != null && userId == this.userLoggedName;
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

        if(post.type == "post"){
          this.manageItemService.deletePost(post.postId).subscribe(
            data => {
              const index = this.userPosts.indexOf(post, 0);
              if (index > -1) {
                this.userPosts.splice(index, 1);
              }
            },
            error => { 
              this.openCommonModal('failpostdelete');
            });
        } else if(post.type == "bird"){
          this.manageItemService.deleteBird(post.postId, post.specieId).subscribe(
            data => {
              const index = this.userPosts.indexOf(post, 0);
              if (index > -1) {
                this.userPosts.splice(index, 1);
              }
            },
            error => { 
              this.openCommonModal('failpostdelete');
            });
        } else if (post.type == "pending"){
          this,this.manageItemService.deletePending(post.postId).subscribe(
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
      }
    });
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
