import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, first, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { MapPoint } from 'src/app/model/Map';
import { AutocompleteResponse } from 'src/app/model/specie';
import { BirdserviceService } from 'src/app/services/bird/birdservice.service';
import { ExternaldataService } from 'src/app/services/data/externaldata.service';
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
      private autocompleteService : ExternaldataService,
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

  getInfoPost(marker: google.maps.Marker, map: google.maps.Map, postId: string, userId: string){
    this.searchBirdsSerices.GetModalBirdPost(postId, userId).subscribe(data => {
        const modal = `<div class="card modalCard">
                        <div class="card-header">
                          <h5 class="card-title mb-0">
                            <a target='_blank' href='/${data.userId}/${data.postId}'>${data.title}</a>
                          </h5>
                        </div>
                        <img class="card-img-top" src="${environment.imagesPostUrl}${data.imageUrl}" alt="${data.altImage}">
                        <div class="card-body">
                        <p class="card-text">${data.text}</p>
                        <a target='_blank' href='/birdpage/${data.specieUrl}'>${data.birdSpecie}</a>
                          <a href="#" class="card-link">Another link</a>
                        </div>
                      </div>`;          

        this.infowindow.setContent(modal);
        this.infowindow.setOptions({maxWidth:250 });
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

  private destroy$ = new Subject<MapPoint[]>();

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
              this.getInfoPost(marker, this.map, data[i].postId, data[i].userId);
            });
  
            this.markers.push(marker);
          }
        });
  }
  
  getMarker(point: MapPoint, map: google.maps.Map){
    const marker = new google.maps.Marker({
      position: { lat: point.location.lat, lng: point.location.lng},
      map,
      icon: "../../../../assets/img/core-img/marker.png",
      //title: `${point.postId},${point.userId}`
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
