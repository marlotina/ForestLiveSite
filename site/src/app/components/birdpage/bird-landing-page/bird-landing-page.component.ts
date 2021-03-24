import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { PostResponse } from 'src/app/model/post';
import { AutocompleteResponse } from 'src/app/model/specie';
import { AutocompleteService } from 'src/app/services/autocomplete/autocomplete.service';
import { PostService } from 'src/app/services/post/post.service';
import { SearchBirdsService } from 'src/app/services/searchs/search-birds.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bird-landing-page',
  templateUrl: './bird-landing-page.component.html',
  styleUrls: ['./bird-landing-page.component.css']
})
export class BirdLandingPageComponent implements OnInit {

  birdPosts: PostResponse[];
  imagesPostUrl = environment.imagesPostUrl;
  hasNotPosts = false;
  hideRemoveBtn = true;
  specieId: string = null;

  filteredSpecies: Observable<AutocompleteResponse[]>;
  autocompleteControl = new FormControl();
  specieIdPostControl = new FormControl();
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private searchBirdsSerices: SearchBirdsService,
    private postService: PostService,
    private autocompleteService : AutocompleteService) { }

  ngOnInit(): void {
    this.filteredSpecies = this.autocompleteControl.valueChanges.pipe(
      startWith(''),
      // delay emits
      debounceTime(300),
      // use switch map so as to cancel previous subscribed events, before creating new once
      switchMap(value => {
        if (value !== '' && value.nameComplete == null) {
          return this.getSpecies(value);
        } else {
          return of([]);
        }
      })
    );

    this.getBirdPosts('');
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

  getBirdPosts(specieId: string) {
    if(specieId != '' ){
      this.searchBirdsSerices.GetBirdBySpecie(specieId).subscribe(
        data =>{ 
          this.birdPosts = data;
          if(data.length > 0){
            this.hasNotPosts = true;
          }else{
            this.hasNotPosts = false;
          }
        } 
      );
    } else {
      this.postService.getPosts().subscribe(
        data => {
          this.birdPosts = data;
          if(data.length > 0){
            this.hasNotPosts = true;
          }else{
            this.hasNotPosts = false;
          }
        }
      );
    }

  }

  getSpecies(value: any): Observable<PostResponse[]> {
    if(value != '' && value.length > 2) {
      return this.autocompleteService.GetSpeciesByKeys(value.toLowerCase(), localStorage.getItem('locale'))
        .pipe(map(results => results),
          catchError(_ => {
            return of(null);
          }
        )
      );
    }

    return null;
  }

  addFilterSpecie(){
    this.hideRemoveBtn = false;
    this.getBirdPosts(this.specieId);
  }

  removeFilterSpecie(){
    this.autocompleteControl.setValue('');
    this.specieIdPostControl.setValue('');
    this.specieId = '';
    this.hideRemoveBtn = true;
    this.getBirdPosts(this.specieId);
  }
}
