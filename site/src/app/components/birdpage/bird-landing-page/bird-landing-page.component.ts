import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { PostListResponse } from 'src/app/model/post';
import { AutocompleteResponse } from 'src/app/model/specie';
import { AccountService } from 'src/app/services/account/account.service';
import { AutocompleteService } from 'src/app/services/autocomplete/autocomplete.service';
import { BirdserviceService } from 'src/app/services/bird/birdservice.service';
import { ManageItemsService } from 'src/app/services/items/manage-items.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
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

  userLoggedName: string;


  filteredSpecies: Observable<AutocompleteResponse[]>;
  autocompleteControl = new FormControl();
  specieIdPostControl = new FormControl();
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private searchBirdsSerices: BirdserviceService,
    private accountService: AccountService,
    private autocompleteService : AutocompleteService,
    private matDialog: MatDialog,
    private activateRoute: ActivatedRoute,
    private manageItemService: ManageItemsService,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(params => {
      this.specieId = params.get("specieId");
      this.getBirdPosts();   
    });

    this.userLoggedName = this.accountService.userValue != null ? this.accountService.userValue.userId : null;

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
          if(data != null && data.length > 0){
            this.hasNotPosts = true;
          }else{
            this.hasNotPosts = false;
          }
          this.loaderService.hide();
        } 
      );
  }

  showDeleteOption(userId){
    return this.userLoggedName != null && userId == this.userLoggedName;
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

          this.manageItemService.deletePost(post.postId).subscribe(
            data => {
              const index = this.birdPosts.indexOf(post, 0);
            if (index > -1) {
              this.birdPosts.splice(index, 1);
            }
            },
            error => { 
              this.openCommonModal('failpostdelete');
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
