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

  constructor(
      private locationService: LocationService,
      private searchBirdsSerices: SearchBirdsService,
      private autocompleteService : AutocompleteService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.initMap();
  }

  initMap() {

    this.locationService.getPosition().then(pos => {
      let latLng = {
        lat: pos.lat,
        lng: pos.lng
      };

      const mapOptions: google.maps.MapOptions = {
        center: latLng,
        zoom: 16,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        clickableIcons: false
      };
      let map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      google.maps.event.addListener(map, 'idle', () => { 
        var wop = map.getCenter();
        var zoom = map.getZoom();
        
        this.searchBirdsSerices.GetSearchPoints(wop.lat().toString(), wop.lng().toString(), zoom).subscribe(
          data => { 
            for (let i = 0; i < data.length; i++) {
              const beach = data[i];
              new google.maps.Marker({
                position: { lat: beach.location.lat, lng: beach.location.lng},
                map,
                title: beach.title
              });
            }
          } 
        );        

      });

    });
  }

}
