import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { AutocompleteService } from 'src/app/services/autocomplete/autocomplete.service';
import { AutocompleteResponse } from 'src/app/model/specie';
import { ManageItemsService } from 'src/app/services/items/manage-items.service';
import { PostAssignSpecieRequest, PostUpdateSpecieRequest } from 'src/app/model/post';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CommonDialogComponent } from '../common-dialog/common-dialog.component';

@Component({
  selector: 'app-select-specie-form',
  templateUrl: './select-specie-form.component.html',
  styleUrls: ['./select-specie-form.component.css']
})
export class SelectSpecieFormComponent implements OnInit {

  filteredSpecies: Observable<AutocompleteResponse[]>;
  autocompleteControl = new FormControl();
  language: string;
  specieId: string;
  specieName: string;
  isPending: boolean = false;
  @Input() postId: string;
  @Input() oldSpecieId: string;
  @Input() type: string;

  @ViewChild('auto') matAutocomplete: MatAutocomplete;  
  @ViewChild('autocompleteControl') specieNamePost: ElementRef<HTMLInputElement>;

  constructor(
    private manageItemsService: ManageItemsService,
    private matDialog: MatDialog,
    private autocompleteService: AutocompleteService) {

        this.language =localStorage.getItem('locale');
        //this.postId = modalData.postId;
  }

  ngOnInit(): void {
    this.isPending = this.type == 'pending'
    this.filteredSpecies = this.autocompleteControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => {
        if (value !== '' && value.nameComplete == null) {
          return this.getSpecies(value);
        } else {
          return of([]);
        }
      })
    );
  }


  selectSpecie(item: AutocompleteResponse){
    this.autocompleteControl.setValue(item.nameComplete);
    this.specieId = item.specieId;
    this.specieName = item.nameComplete
  }

  getSpecies(value: any): Observable<AutocompleteResponse[]> {
    if(value != '' && value.length > 2) {
      return this.autocompleteService.GetSpeciesByKeys(value.toLowerCase(), localStorage.getItem('locale'))
        .pipe(map(results => results),
          catchError(_ => {
            return of([]);
          }
        )
      );
    }

    return of([]);
  }

  assignpecie()
  {
    let request: PostUpdateSpecieRequest = {
      specieId: this.specieId,
      specieName: this.specieName,
      oldSpecieId: this.oldSpecieId,
      postId: this.postId
    };

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
        this.manageItemsService.assignBird(request).subscribe(
          data=> {
            console.log(data);
          },
          error=>{
            console.log(error);
          }
        )
      }
    });
  }

  updateSpecie()
  {
    let request: PostUpdateSpecieRequest = {
      specieId: this.specieId,
      specieName: this.specieName,
      oldSpecieId: this.oldSpecieId,
      postId: this.postId
    };

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
        this.manageItemsService.updateBird(request).subscribe(
          data=> {
            console.log(data);
          },
          error=>{
            console.log(error);
          }
        )
      }
    });
  }
}
