import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { MapSpeciePoint } from 'src/app/model/Map';
import { PostResponse } from 'src/app/model/post';
import { AutocompleteResponse } from 'src/app/model/specie';
import { AutocompleteService } from 'src/app/services/autocomplete/autocomplete.service';
import { LocationService } from 'src/app/services/location/location.service';
import { SearchBirdsService } from 'src/app/services/searchs/search-birds.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {


  center: any;
  @ViewChild('mapWrapper') mapElement: ElementRef;
  zoom: number = 16;

  filteredSpecies: Observable<AutocompleteResponse[]>;
  autocompleteControl = new FormControl();
  specieIdPostControl = new FormControl();
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  map: google.maps.Map;
  markers: google.maps.Marker[] = [];
  specieId: string = null;
  infowindow = new google.maps.InfoWindow();
  
  constructor(
      private locationService: LocationService,
      private searchBirdsSerices: SearchBirdsService,
      private autocompleteService : AutocompleteService) { }

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

  ngAfterViewInit() {
    this.initMap();
  }

  getInfoPost(marker: google.maps.Marker, map: google.maps.Map){
    var postInfo = marker.getTitle().split(',');
    this.searchBirdsSerices.GetModalBirdPost(postInfo[0], postInfo[1]).subscribe(data => {
        const modal = `<div style='float:left'><img style='width: 100px;' src='${environment.imagesPostUrl}${data.imageUrl}' alt='${data.altImage}'>`+ 
        `</div><div style='float:right; padding: 10px;'><b><a target='_blank' href='/${data.userId}/post/${data.postId}'>${data.title}</a>`+ 
        `</b><br/>${data.text}<br/> ${data.birdSpecie}</div>`;

        this.infowindow.setContent(modal);
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
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

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
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        
        var latLng = bounds.getCenter();
        this.map.fitBounds(bounds);

        this.searchBirdsSerices.GetSearchPoints(latLng.lat(), latLng.lng(), this.zoom).subscribe(
          data => { 
            this.setMapOnAll(null);
            for (let i = 0; i < data.length; i++) {
              const marker = this.getMarker(data[i], this.map);
              
              marker.addListener("click", () => {
                this.getInfoPost(marker, this.map);
              });

              this.markers.push(marker);
            }
          } 
        );
      });

      google.maps.event.addListener(this.map, 'idle', () => { 
        var latLng = this.map.getCenter();
        this.zoom = this.map.getZoom();
        
        this.searchBirdsSerices.GetSearchPoints(latLng.lat(), latLng.lng(), this.zoom).subscribe(
          data => { 
            this.setMapOnAll(null);
            for (let i = 0; i < data.length; i++) {
              const marker = this.getMarker(data[i], this.map);

              marker.addListener("click", () => {
                this.getInfoPost(marker, this.map);
              });

              this.markers.push(marker);
            }
          } 
        ); 
      });
    });
  }

  getBirds(){
    
  }
  getMarker(point: MapSpeciePoint, map: google.maps.Map){
    const marker = new google.maps.Marker({
      position: { lat: point.location.lat, lng: point.location.lng},
      map,
      icon: "../../../../assets/img/core-img/mapMarker.png",
      title: `${point.postId},${point.specieId}`
    });

    return marker;
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
    var latLng = this.map.getCenter();

    this.searchBirdsSerices.GetPointsBySpecie(latLng.lat(), latLng.lng(), this.zoom, specieId).subscribe(
      data =>{ 
        this.setMapOnAll(null);
        for (let i = 0; i < data.length; i++) {
          const marker = this.getMarker(data[i], this.map);

          marker.addListener("click", () => {
            this.getInfoPost(marker, this.map);
          });

          this.markers.push(marker);
        }
      } 
    );
  }

  setMapOnAll(map: google.maps.Map | null) {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
    
    this.markers = [];
  }
}
