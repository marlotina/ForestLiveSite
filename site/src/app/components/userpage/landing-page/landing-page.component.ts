import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
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
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})

export class LandingPageComponent implements OnInit {
  
  userLoggedName: string = null;
  userPosts: PostListResponse[];
  userId: string;
  imagesPostUrl = environment.imagesPostUrl;
  imagesProfileUrl = environment.imagesProfileUrl;
  hasPosts = false;
  userLabels: UserLabelPageResponse[];
  selectedLabel: string;
  isLoading = true;
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
  }

  ngOnInit(): void {

    this.activateRoute.paramMap.subscribe(params => {
      this.userId = params.get("userId");
      this.searchPosts();   
    });

    this.userLoggedName = this.accountService.userValue.userId;
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

  searchWithLabels(label: string) {
    if(this.selectedLabel != null && label == this.selectedLabel){
      this.selectedLabel = null;
    } else {
      this.selectedLabel = label;
    }

    this.searchPosts();
  }

  searchPosts(){
    this.userPostService.GetPosts(this.userId, this.selectedLabel, this.searchType).subscribe(
      data =>{ 
        this.userPosts = data;
        this.hasPosts = this.userPosts.length == 0; 
        this.loaderService.hide();
        this.isLoading = false;
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
