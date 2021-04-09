import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, first, map, startWith, switchMap } from 'rxjs/operators';
import { User } from 'src/app/model/account';
import { PostListResponse } from 'src/app/model/post';
import { AutocompleteResponse } from 'src/app/model/specie';
import { VoteRequest } from 'src/app/model/vote';
import { AccountService } from 'src/app/services/account/account.service';
import { AutocompleteService } from 'src/app/services/autocomplete/autocomplete.service';
import { BirdserviceService } from 'src/app/services/bird/birdservice.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { PostService } from 'src/app/services/post/post.service';
import { VoteService } from 'src/app/services/vote/vote.service';
import { environment } from 'src/environments/environment';
import { CommonDialogComponent } from '../../shared/common-dialog/common-dialog.component';
import { ImageDialogComponent } from '../../shared/image-dialog/image-dialog.component';

@Component({
  selector: 'app-bird-landing-page',
  templateUrl: './bird-landing-page.component.html',
  styleUrls: ['./bird-landing-page.component.css']
})
export class BirdLandingPageComponent implements OnInit {

  birdPosts: PostListResponse[];
  imagesPostUrl = environment.imagesPostUrl;
  hasNotPosts = false;
  hideRemoveBtn = true;
  
  specieId: string = null;
  searchOrder: number = 1;

  userLoggedInfo: User;


  filteredSpecies: Observable<AutocompleteResponse[]>;
  autocompleteControl = new FormControl();
  specieIdPostControl = new FormControl();
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private searchBirdsSerices: BirdserviceService,
    private postService: PostService,
    private voteService: VoteService,
    private accountService: AccountService,
    private autocompleteService : AutocompleteService,
    private matDialog: MatDialog,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.userLoggedInfo = this.accountService.userValue;

    this.filteredSpecies = this.autocompleteControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => {
        if (value.length > 2 && value.nameComplete == null) {
          return this.getSpecies(value);
        } else {
          return of([]);
        }
      })
    );
    this.getBirdPosts();
  }

  selectSpecie(item: AutocompleteResponse){
    this.autocompleteControl.setValue(item.nameComplete);
    this.specieIdPostControl.setValue(item.specieId);
    this.specieId = item.specieId;
  }

  optionClicked(event: Event, specie: AutocompleteResponse) {
    event.stopPropagation();
    //this.toggleSelection(specie);
  }

  toggleSelection(user: AutocompleteResponse) {
    var wop = user;
    
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
                
              });
    }else{
      this.voteService.AddVote(request)
      .pipe(first())
          .subscribe(
              data => {    
                post.voteCount++;
                post.hasVote = true;
                post.voteId = data.id;
              });
    }
    
  }

  changeSearchOrder(e: any){
    this.searchOrder = e.target.value;
    this.getBirdPosts();
  }

  addFilterSpecie(){
    this.hideRemoveBtn = false;
    if(this.specieId != null){
      this.getBirdPosts();
    }
  }

  removeFilterSpecie(){
    this.autocompleteControl.setValue('');
    this.specieIdPostControl.setValue('');
    this.specieId = null;
    this.hideRemoveBtn = true;
    this.getBirdPosts();
  }

  getBirdPosts() {
    this.loaderService.show();
    
      this.searchBirdsSerices.GetBirdBySpecie(this.specieId, this.searchOrder).subscribe(
        data =>{ 
          this.birdPosts = data;
          if(data.length > 0){
            this.hasNotPosts = true;
          }else{
            this.hasNotPosts = false;
          }
          this.loaderService.hide();
        } 
      );
  }

  showDeleteOption(userId){
    return this.userLoggedInfo != null && userId == this.userLoggedInfo.userName;
  }

  getSpecies(value: any): Observable<PostListResponse[]> {
    
    return this.autocompleteService.GetSpeciesByKeys(value.toLowerCase(), localStorage.getItem('locale'))
      .pipe(map(results => results),
        catchError(_ => {
          return of(null);
        }
      )
    );
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
            const index = this.birdPosts.indexOf(post, 0);
            if (index > -1) {
              this.birdPosts.splice(index, 1);
            }
          },
          error => { 
          });
      }
    });
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
