import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, first, map, startWith, switchMap } from 'rxjs/operators';
import { AutocompleteService } from 'src/app/services/autocomplete/autocomplete.service';
import { AutocompleteResponse } from 'src/app/model/specie';
import { ManageItemsService } from 'src/app/services/items/manage-items.service';
import { PostUpdateSpecieRequest } from 'src/app/model/post';

@Component({
  selector: 'app-select-specie-dialog',
  templateUrl: './select-specie-dialog.component.html',
  styleUrls: ['./select-specie-dialog.component.css']
})
export class SelectSpecieDialogComponent implements OnInit {

  filteredSpecies: Observable<AutocompleteResponse[]>;
  autocompleteControl = new FormControl();
  language: string;
  specieId: string;
  specieName: string;
  postId: string; 

  @ViewChild('auto') matAutocomplete: MatAutocomplete;  
  @ViewChild('autocompleteControl') specieNamePost: ElementRef<HTMLInputElement>;

  constructor(
    private manageItemsService: ManageItemsService,
    private autocompleteService: AutocompleteService,
    public dialogRef: MatDialogRef<SelectSpecieDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public modalData: any) {

        this.language =localStorage.getItem('locale');
        this.postId = modalData.postId;
  }

  ngOnInit(): void {
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

  changeSpecie()
  {
    let request: PostUpdateSpecieRequest = {
      specieId: this.specieId,
      specieName: this.specieName,
      postId: this.postId
    };
      
    this.manageItemsService.assignBird(request).subscribe(
      data=> {
        console.log(data);
      },
      error=>{
        console.log(error);
      }
    )
  }

  updateSpecie()
  {

  }

  closeModal() {
    this.dialogRef.close();
  }
}
