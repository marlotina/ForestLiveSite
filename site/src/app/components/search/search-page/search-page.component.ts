import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { MapPoint } from 'src/app/model/Map';
import { PostResponse } from 'src/app/model/post';
import { AutocompleteResponse } from 'src/app/model/specie';
import { AutocompleteService } from 'src/app/services/autocomplete/autocomplete.service';
import { LocationService } from 'src/app/services/location/location.service';
import { PostService } from 'src/app/services/post/post.service';
import { SearchBirdsService } from 'src/app/services/searchs/search-birds.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {


  center: any;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: MapPoint[] = [];
  postResponse: PostResponse[];
  @ViewChild('mapWrapper') mapElement: ElementRef;
  zoom: number = 16;

  filteredSpecies: Observable<AutocompleteResponse[]>;
  autocompleteControl = new FormControl();
  specieIdPostControl = new FormControl();
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  birdPosts: PostResponse[];

    
  infowindow = new google.maps.InfoWindow();
  
  constructor(
      private locationService: LocationService,
      private searchBirdsSerices: SearchBirdsService,
      private autocompleteService : AutocompleteService,
      private readonly postService: PostService) { }

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
  }

  ngAfterViewInit() {
    this.initMap();
  }

  getInfoPost(marker: google.maps.Marker, map: google.maps.Map){
    var postId = marker.getTitle();
    this.postService.GetPost(postId).subscribe(data => {
        this.infowindow.setContent(`titulo${data.title}`);
        this.infowindow.open(map, marker);
    })
  }

  initMap() {

    this.locationService.getPosition().then(pos => {
      let latLng = {
        lat: pos.lat,
        lng: pos.lng
      };

      const mapOptions: google.maps.MapOptions = {
        center: latLng,
        zoom: this.zoom,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        clickableIcons: false
      };
      let map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);


      const input = document.getElementById("pac-input") as HTMLInputElement;
      const searchBox = new google.maps.places.SearchBox(input);
    
      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
    
        if (places.length == 0) {
          return;
        }

        const bounds = new google.maps.LatLngBounds();
        places.forEach((place) => {
          if (!place.geometry || !place.geometry.location) {
            console.log("Returned place contains no geometry");
            return;
          }
          
          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        
        var wop = bounds.getCenter();
        map.fitBounds(bounds);

        this.searchBirdsSerices.GetSearchPoints(wop.lat().toString(), wop.lng().toString(), this.zoom).subscribe(
          data => { 
            for (let i = 0; i < data.length; i++) {
              const beach = data[i];
              new google.maps.Marker({
                position: { lat: beach.location.lat, lng: beach.location.lng},
                map,
                icon: "../../../../assets/img/core-img/mapMarker.png",
                title: beach.postId
              });
            }
          } 
        );        

      });

      google.maps.event.addListener(map, 'idle', () => { 
        var wop = map.getCenter();
        this.zoom = map.getZoom();
        
        this.searchBirdsSerices.GetSearchPoints(wop.lat().toString(), wop.lng().toString(), this.zoom).subscribe(
          data => { 
            for (let i = 0; i < data.length; i++) {
              const beach = data[i];
              const marker = new google.maps.Marker({
                position: { lat: beach.location.lat, lng: beach.location.lng},
                map,
                icon: "../../../../assets/img/core-img/mapMarker.png",
                title: beach.postId
              });

              marker.addListener("click", () => {
                this.getInfoPost(marker, map);
              });
            }
          } 
        ); 
      });

     

    });
  }

  selectSpecie(item: AutocompleteResponse){
    this.autocompleteControl.setValue(item.nameComplete);
    this.specieIdPostControl.setValue(item.specieId);
    this.getBirdPosts(item.specieId);
  }

  optionClicked(event: Event, specie: AutocompleteResponse) {
    event.stopPropagation();
    //this.toggleSelection(specie);
  }

  toggleSelection(user: AutocompleteResponse) {
    var wop = user;
    
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

  getBirdPosts(specieId: string) {
    this.searchBirdsSerices.GetBirdBySpecie(specieId).subscribe(
      data =>{ 
        this.birdPosts = data;
      } 
    );
  }
}
