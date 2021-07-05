import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, first, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { MapSpeciePoint } from 'src/app/model/Map';
import { PostResponse } from 'src/app/model/post';
import { AutocompleteResponse } from 'src/app/model/specie';
import { AutocompleteService } from 'src/app/services/autocomplete/autocomplete.service';
import { BirdserviceService } from 'src/app/services/bird/birdservice.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { LocationService } from 'src/app/services/location/location.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {


  private _filters$ = new Subject<void>();

  center: any;
  @ViewChild('mapWrapper') mapElement: ElementRef;
  zoom: number = 13;

  filteredSpecies: Observable<AutocompleteResponse[]>;
  autocompleteControl = new FormControl();
  specieIdPostControl = new FormControl();
  map: google.maps.Map;
  markers: google.maps.Marker[] = [];
  specieId: string = '';
  infowindow = new google.maps.InfoWindow();
  hideRemoveBtn = true;
  searchSpecie: number = 1

  constructor(
      private locationService: LocationService,
      private searchBirdsSerices: BirdserviceService,
      private autocompleteService : AutocompleteService,
      private loaderService: LoaderService) {
        this.loaderService.show();
       }

  ngOnInit(): void {
    this.filteredSpecies = this.autocompleteControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => {
        if (value.length > 2  && value.nameComplete == null) {
          return this.getSpecies(value);
        } else {
          return of([]);
        }
      })
    );
  }

  ngAfterViewInit() {
    this.getLocation();
  }

  getInfoPost(marker: google.maps.Marker, map: google.maps.Map){
    var postInfo = marker.getTitle().split(',');
    this.searchBirdsSerices.GetModalBirdPost(postInfo[0], postInfo[1]).subscribe(data => {
        const modal = `<div style='float:left'><img style='width: 100px;' src='${environment.imagesPostUrl}${data.imageUrl}' alt='${data.altImage}'>`+ 
        `</div><div style='float:right; padding: 10px;'><b><a target='_blank' href='/${data.userId}/${data.postId}'>${data.title}</a>`+ 
        `</b><br/>${data.text}<br/> ${data.birdSpecie}</div>`;

        this.infowindow.setContent(modal);
        this.infowindow.open(map, marker);
    })
  }

  getLocation() {
    this.locationService.getPosition().then(
      pos => {
        let latLng = {
          lat: pos.lat,
          lng: pos.lng
        }; 
        this.initMap(latLng);
    },
    reject=>{
      let latLng = {
        lat: 47.711062647193195,
        lng: 6.134101681429014
      };
      this.initMap(latLng);
    });
  }

  initMap(latLng: any) {

    const mapOptions: google.maps.MapOptions = {
      center: latLng,
      zoom: this.zoom,
      fullscreenControl: false,
      minZoom: 6,
      mapTypeControl: true,
      streetViewControl: false,
      clickableIcons: false,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.INSET,
        mapTypeIds: [
            google.maps.MapTypeId.ROADMAP,
            google.maps.MapTypeId.SATELLITE
        ]
    },
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
      
      this.map.fitBounds(bounds);
      this.getBirds(bounds.getCenter(), false);
    });

    google.maps.event.addListener(this.map, 'idle', () => { 
      this.zoom = this.map.getZoom();
      this.getBirds(this.map.getCenter(), false);
    });

    google.maps.event.addListenerOnce(map, 'tilesloaded', () => {
      this.loaderService.hide();
    });
    
  }

  private destroy$ = new Subject<MapSpeciePoint[]>();

  public ngOnDestroy(): void {
    this._filters$.next();
    this._filters$.complete();
}

  getBirds(latLng: google.maps.LatLng, removePoint: boolean){

    this._filters$.pipe(
        startWith(''),
        switchMap(() => this.searchBirdsSerices.GetSearchPoints(latLng.lat(), latLng.lng(), this.zoom, this.specieId)), 
        takeUntil(this.destroy$))
        .subscribe(data => {
          if(removePoint) {
            this.setMapOnAll(null);
          }

          for (let i = 0; i < data.length; i++) {
            const marker = this.getMarker(data[i], this.map);
  
            marker.addListener("click", () => {
              this.getInfoPost(marker, this.map);
            });
  
            this.markers.push(marker);
          }
        });
  }
  
  getMarker(point: MapSpeciePoint, map: google.maps.Map){
    const marker = new google.maps.Marker({
      position: { lat: point.location.lat, lng: point.location.lng},
      map,
      icon: "../../../../assets/img/core-img/marker.svg",
      title: `${point.postId},${point.specieId}`
    });

    return marker;
  }

  selectSpecie(item: AutocompleteResponse){
    this.autocompleteControl.setValue(item.nameComplete);
    this.specieIdPostControl.setValue(item.specieId);
    this.specieId = item.specieId;
  }

  addFilterSpecie(){
    this.hideRemoveBtn = false;
    this.getBirds(this.map.getCenter(), true);
  }

  removeFilterSpecie(){
    this.autocompleteControl.setValue('');
    this.specieIdPostControl.setValue('');
    this.specieId = '';
    this.hideRemoveBtn = true;
    this.getBirds(this.map.getCenter(), true);
  }

  optionClicked(event: Event, specie: AutocompleteResponse) {
    event.stopPropagation();
    //this.toggleSelection(specie);
  }

  toggleSelection(user: AutocompleteResponse) {
    var wop = user;
  }

  getSpecies(value: any): Observable<AutocompleteResponse[]> {
    if(value != '' && value.length > 2) {
      if(this.searchSpecie == 1){
        return this.autocompleteService.GetSpeciesByName(value.toLowerCase(), localStorage.getItem('locale'))
          .pipe(map(results => results),
            catchError(_ => {
              return of(null);
            }
          )
        );
      }else{
        return this.autocompleteService.GetSpeciesByScienceName(value.toLowerCase(), localStorage.getItem('locale'))
          .pipe(map(results => results),
            catchError(_ => {
              return of(null);
            }
          )
        );
      }
    }

    return of([]);
  }

  changeSearchSpecie(e: any){
    this.searchSpecie = e.target.value;
  }

  setMapOnAll(map: google.maps.Map | null) {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
    
    this.markers = [];
  }
}
