import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, map, startWith, switchMap } from 'rxjs/operators';
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
  userName: string;
  imagesProfileUrl = environment.imagesProfileUrl;
  
  @ViewChild('auto') matAutocomplete: MatAutocomplete;  
  @ViewChild('autocompleteControl') specieNamePost: ElementRef<HTMLInputElement>;

  users: UserListResponse[] =[];
  constructor(
    private userInteractionsService: UserInteractionsService,
    private loaderService: LoaderService
  ) { 
  }

  getUsers(): void {
    this.loaderService.show();
    this.userInteractionsService.GetUsers().subscribe(
      data=> {
        this.users = data;
        this.loaderService.hide();
      }
    )
  }

  ngOnInit(): void {
    this.getUsers();

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
    this.autocompleteControl.setValue(item.userName);
    this.userName = item.userName
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
