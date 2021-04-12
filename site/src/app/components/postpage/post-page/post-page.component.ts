import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PostResponse } from 'src/app/model/post';
import { AccountService } from 'src/app/services/account/account.service';
import { GetItemsService } from 'src/app/services/items/get-items.service';
import { ManageItemsService } from 'src/app/services/items/manage-items.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { PostService } from 'src/app/services/post/post.service';
import { environment } from 'src/environments/environment';
import { CommonDialogComponent } from '../../shared/common-dialog/common-dialog.component';
import { ImageDialogComponent } from '../../shared/image-dialog/image-dialog.component';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html'
})
export class PostPageComponent implements OnInit {
 
  @ViewChild('mapWrapper') mapElement: ElementRef;
  post = new PostResponse();
  imagesProfileUrl = environment.imagesProfileUrl;
  imagePostUrl: string;
  showOwnerOptions = false;
  userLoggedName: string;
  hasPost = false;
  hasLocation = true;
  type: string;
  urlPage: string;

  constructor(private activateRoute: ActivatedRoute,
    private meta: Meta,
    private loaderService: LoaderService,
    private getItemService: GetItemsService,
    private postService: PostService,
    private accountService: AccountService,
    private manageItemService: ManageItemsService,
    private matDialog: MatDialog,
    private route: Router) { 
    }

  ngOnInit(): void {
    this.loaderService.show();
    this.userLoggedName = this.accountService.userValue != null ? this.accountService.userValue.userName : null;
    
    this.activateRoute.paramMap.subscribe(params => {
      let postId = params.get("postId");

      this.getItemService.getPost(postId).subscribe(
        data => { 
          this.post = data;  
          this.showOwnerOptions = this.userLoggedName != null && this.post.userId == this.userLoggedName;
          this.hasPost = true;
          this.imagePostUrl = environment.imagesPostUrl + this.post.imageUrl;
          this.urlPage = `${environment.pageDomain}/${this.post.userId}/${this.post.postId}`;
          this.loaderService.hide();
    
          this.addMetas(this.post, this.imagePostUrl, this.urlPage);
          this.initMap(this.post.latitude, this.post.longitude);
        }
      );
      
    });
  }
  
  addMetas(post: PostResponse, image: string, url: string){
    this.meta.updateTag({ name: 'og:title', content: post.title })
    //this.meta.addTag({ name: 'og:type', content: url })
    this.meta.updateTag({ name: 'og:image', content: image })
    this.meta.updateTag({ name: 'og:url', content: url })
    //this.meta.addTag({ name: 'og:description', content: url })
  }

  manageError(errorStatus: string){
    if(errorStatus == "409"){
      this.openCommonModal('account.conflictNameMessage');
    } else {
      this.openCommonModal('user.failUserAction');
    } 
  }


  deletePost(){

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

        if(this.post.type == "post"){
          this.manageItemService.deletePost(this.post.postId).subscribe(
            data => {
              this.route.navigate(['/userpage/' + this.post.userId]);
            },
            error => { 
              this.openCommonModal('failpostdelete');
            });
        } else if(this.post.type == "bird"){
          this.manageItemService.deleteBird(this.post.postId, this.post.specieId).subscribe(
            data => {
              this.route.navigate(['/userpage/' + this.post.userId]);
            },
            error => { 
              this.openCommonModal('failpostdelete');
            });
        } else if (this.post.type == "pending"){
          this,this.manageItemService.deletePending(this.post.postId).subscribe(
            data => {
              this.route.navigate(['/userpage/' + this.post.userId]);
            },
            error => { 
              this.openCommonModal('failpostdelete');
            });
        }
      }
    });
  }

  deleteItem(){
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
        this.postService.deletePost(this.post.postId).subscribe(
          data => {
            this.route.navigate(['/userpage/' + this.post.userId]);
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

  showImage(imageUrl: string) {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.width = "100%"; 
    dialogConfig.data = {
      image: imageUrl
    }
    
    this.matDialog.open(ImageDialogComponent, dialogConfig);
  }

  initMap(lat: number, lng: number) {
    if(lat != null || lng != null){
      this.hasLocation = true;
      let latLng: google.maps.LatLngLiteral = {
        lat: Number.parseFloat(lat.toString()),
        lng: Number.parseFloat(lng.toString())
      };
      
  
      const mapOptions: google.maps.MapOptions = {
        center: latLng,
        zoom: 11,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        clickableIcons: false
      };
      const map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.getMarker(latLng, map);
    }else{
      this.hasLocation = false;
    }
  }

  getMarker(latLng: google.maps.LatLngLiteral, map: google.maps.Map){
    const marker = new google.maps.Marker({
      position: { lat: latLng.lat, lng: latLng.lng},
      map,
      icon: "../../../../assets/img/core-img/marker.svg",
    });
  } 

}
