import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { AutocompleteService } from 'src/app/services/autocomplete/autocomplete.service';
import { AutocompleteResponse } from 'src/app/model/specie';
import { ManageItemsService } from 'src/app/services/items/manage-items.service';

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

  @ViewChild('auto') matAutocomplete: MatAutocomplete;  
  @ViewChild('matInput') specieNamePost: ElementRef<HTMLInputElement>;

  constructor(
    private manageItemsService: ManageItemsService,
    private autocompleteService: AutocompleteService,
    public dialogRef: MatDialogRef<SelectSpecieDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public modalData: any) {

        this.language =localStorage.getItem('locale');
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
  }

  getSpecies(value: any): Observable<AutocompleteResponse[]> {
    if(value != '' && value.length > 2) {
      return this.autocompleteService.GetSpeciesByKeys(value.toLowerCase(), this.language)
        .pipe(
          map(results => results),
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

  }

  updateSpecie()
  {

  }

  closeModal() {
    this.dialogRef.close();
  }
}
