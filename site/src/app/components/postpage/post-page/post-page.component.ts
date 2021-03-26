import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
import { ImageDialogComponent } from '../../shared/image-dialog/image-dialog.component';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html'
})
export class PostPageComponent implements OnInit {
 
  @ViewChild('mapWrapper') mapElement: ElementRef;
  commentForm: FormGroup;
  post = new PostResponse();
  comments: CommentResponse[];
  imagesProfileUrl = environment.imagesProfileUrl;
  showOwnerOptions = false;
  postLabels: string[];
  imagePost: string;
  isLogged: boolean;
  userLoggedInfo: User;
  hasPost = true;
  hasLocation = false;
  hasLabels = false;

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
      userId: [{ disabled: true}, Validators.required],
      postId: ['', [Validators.required]],
      specieId: [null],
      authorPostUserId: ['', [Validators.required]],
      titlePost: ['', [Validators.required]]
    });

    this.userLoggedInfo = this.accountService.userValue;
    this.isLogged = this.userLoggedInfo != null;
    
    this.activateRoute.paramMap.subscribe(params => {
      let postId = params.get("id");
      this.postService.getPost(postId).subscribe(
        data => { 
          this.post = data;  
          this.postLabels = data.labels;
          this.imagePost = environment.imagesPostUrl + data.imageUrl;
          this.showOwnerOptions = this.userLoggedInfo != null && this.post.userId == this.userLoggedInfo.userName;
          this.hasPost = true;
          this.hasLabels = data.labels.length > 0;
          this.initMap(this.post.latitude, this.post.longitude);

          this.commentForm.patchValue({
            'userId': this.userLoggedInfo != null ? this.userLoggedInfo.userName : '',
            'postId': this.post.id,
            'specieId': this.post.specieId,
            'authorPostUserId': this.post.userId,
            'titlePost': this.post.title
            });
        },
        error => {
          this.hasPost = false;
        }
      );

      this.commentService.GetCommentsByPost(postId).subscribe(
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
              this.comments.push(data);
              this.post.commentCount++;
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

  addVote(post: PostResponse, hasVote: boolean){
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

  deleteComment(comment: CommentResponse){
    this.commentService.DeleteComment(comment.postId, comment.id).subscribe(
      data => {
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
        zoom: 16,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        clickableIcons: false
      };
      const map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.getMarker(latLng, map);
    }
}

getMarker(latLng: google.maps.LatLngLiteral, map: google.maps.Map){
  const marker = new google.maps.Marker({
    position: { lat: latLng.lat, lng: latLng.lng},
    map,
    icon: "../../../../assets/img/core-img/mapMarker.png",
  });
}

}
