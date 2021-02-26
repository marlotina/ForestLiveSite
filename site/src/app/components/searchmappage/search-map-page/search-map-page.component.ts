import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LocationService } from 'src/app/services/location/location.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-map-page',
  templateUrl: './search-map-page.component.html',
  styleUrls: ['./search-map-page.component.css']
})
export class SearchMapPageComponent implements OnInit {

  center: any;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];
  display: any;
  mapOptions: google.maps.MapOptions = {
    zoom:15,
    streetViewControl: false,
    fullscreenControl: false,
    clickableIcons: false
 };
 apiLoaded: Observable<boolean>

  constructor(private httpClient: HttpClient,
      private locationService: LocationService) { }

  ngOnInit(): void {
    this.setMapMarker();
  }

  loadMap(){
    if(this.apiLoaded == null){
      this.apiLoaded = this.httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=' + environment.googleApiKey, 'callback')
      .pipe(
        map((data) => true),
        catchError((e) => of(false)
         ),
      );
    }
  }

  setMapMarker() {
    this.locationService.getPosition().then(pos => {
      let latLng = {
        lat: pos.lat,
        lng: pos.lng
      };
      this.addMarkerCommon(latLng);
      this.center = latLng;
      
      this.loadMap();
    });
  }

  addMarkerCommon(latLng){
    if(this.markerPositions.length > 0){
      this.markerPositions[0] = latLng;
    }else{
      this.markerPositions.push(latLng);
    }
  }
}
