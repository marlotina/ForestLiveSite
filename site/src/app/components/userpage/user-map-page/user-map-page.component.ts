import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MapPoint } from 'src/app/model/Map';
import { PostResponse } from 'src/app/model/post';
import { LocationService } from 'src/app/services/location/location.service';
import { PostService } from 'src/app/services/post/post.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-map-page',
  templateUrl: './user-map-page.component.html',
  styleUrls: ['./user-map-page.component.css']
})
export class UserMapPageComponent implements OnInit {


  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
  infoContent: string;

  center: any;
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: "../../../../assets/img/core-img/mapMarker.png"
  };
  markerPositions: MapPoint[] = [];
  display: any;
  mapOptions: google.maps.MapOptions = {
    zoom:10,
    streetViewControl: false,
    fullscreenControl: false,
    clickableIcons: false
 };
 apiLoaded: Observable<boolean>
 userId: string;

  constructor(private httpClient: HttpClient,
      private locationService: LocationService,
      private route: ActivatedRoute,
      private postService: PostService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get("userId");
    });

    this.locationService.getPosition().then(pos => {
      let latLng = {
        lat: pos.lat,
        lng: pos.lng
      };

      this.center = latLng;
      this.loadMap();
    });

  }

  getPoints(){
    this.postService.GetMapPointsPostByUser(this.userId).subscribe(
      data =>{ 
        this.setMapMarker(data);
      } 
    );
  }

  loadMap(){
    if(this.apiLoaded == null){
      this.apiLoaded = this.httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${environment.googleApiKey}`, 'callback')
      .pipe(
        map((data) => {
          this.getPoints();
          return true}),
        catchError((e) => of(false)
         ),
      );
    }
  }

  openInfo(marker: MapMarker, content: MapPoint) {
    let template = `<div id="iw-container">` +
    `<a target_"blak" href="${content.userId}/post/${content.postId}"><div class="iw-title">${content.title}</div></a>` +
    `<div class="iw-content"><div class="iw-subTitle">${content.birdSpecie}</div>` +
    `<img src="${environment.imagesPostUrl}${content.imageUrl}" alt="${content.imageUrl}" height="115" width="83">` +
    `<p>${content.birdSpecie}</p></div></div>`;

    this.infoContent = template;
    this.infoWindow.open(marker);
}

  setMapMarker(points: MapPoint[]) {
      this.markerPositions = points;
  }
}
