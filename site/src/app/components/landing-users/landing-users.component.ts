import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, first, map, startWith, switchMap } from 'rxjs/operators';
import { UserListResponse, UserAutocompleteResponse } from 'src/app/model/user';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserInteractionsService } from 'src/app/services/user-interactions/user-interactions.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-landing-users',
  templateUrl: './landing-users.component.html',
  styleUrls: ['./landing-users.component.css']
})
export class LandingUsersComponent implements OnInit {

  filteredSpecies: Observable<UserAutocompleteResponse[]>;
  autocompleteControl = new FormControl();
  collapseChange = new FormControl();
  imagesProfileUrl = environment.imagesProfileUrl;
  
  @ViewChild('auto') matAutocomplete: MatAutocomplete;  
  @ViewChild('autocompleteControl') specieNamePost: ElementRef<HTMLInputElement>;

  users: UserListResponse[] =[];
  hideRemoveBtn = true;

  constructor(
    private userInteractionsService: UserInteractionsService,
    private loaderService: LoaderService
  ) { 
  }

  removeFilterSpecie(){
    this.autocompleteControl.setValue('');
    this.hideRemoveBtn = true;
    this.userInteractionsService.GetUsers()
    .pipe(first())
    .subscribe(
        data => {    
          this.users = data;
          this.loaderService.hide();
        },
        error => {   
          
        });
  }

  getAll(){
    this.userInteractionsService.GetUsers()
    .pipe(first())
    .subscribe(
        data => {    
          this.users = data;
          this.loaderService.hide();
        },
        error => {   
          
        });
  }

  addFilterSpecie(value: any) {
    this.hideRemoveBtn = false;
    this.loaderService.show();
    this.userInteractionsService.GetUsersByKey(value)
      .pipe(first())
      .subscribe(
          data => {    
            this.users = data;
            this.loaderService.hide();
          },
          error => {   
            
          });
  }

  ngOnInit(): void {
    this.getAll();

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

  selectSpecie(item: UserAutocompleteResponse){
    this.addFilterSpecie(item.userName);
  }

  getSpecies(value: any): Observable<UserAutocompleteResponse[]> {
    if(value != '' && value.length > 2) {
      return this.userInteractionsService.AutocompleteByUserName(value.toLowerCase())
        .pipe(map(results => results),
          catchError(_ => {
            return of([]);
          }
        )
      );
    }

    return of([]);
  }
}
