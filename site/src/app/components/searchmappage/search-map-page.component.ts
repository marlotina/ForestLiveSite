import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PostResponse } from 'src/app/model/post';
import { LocationService } from 'src/app/services/location/location.service';
import { SearchBirdsService } from 'src/app/services/searchs/search-birds.service';
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
    zoom:10,
    streetViewControl: false,
    fullscreenControl: false,
    clickableIcons: false
 };
 apiLoaded: Observable<boolean>
 pendingPosts: PostResponse[];

  constructor(private httpClient: HttpClient,
      private locationService: LocationService,
      private searchBirdsSerices: SearchBirdsService) { }

  ngOnInit(): void {
    this.searchBirdsSerices.GetToConfirm("").subscribe(
      data =>{ 
        this.setMapMarker(data);
      } 
    );
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

  setMapMarker(points: PostResponse[]) {
    this.locationService.getPosition().then(pos => {
      let latLng = {
        lat: pos.lat,
        lng: pos.lng
      };
      this.center = latLng;

      points.forEach(element => {
        this.markerPositions.push({
          lat: element.latitude,
          lng: element.longitude
        });
      });

      
      this.loadMap();
    });
  }
}
