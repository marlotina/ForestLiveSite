import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: MapPoint[] = [];
  @ViewChild('mapWrapper') mapElement: ElementRef;
  zoom: number = 16;


  /*markerOptions: google.maps.MarkerOptions = {
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
 apiLoaded: Observable<boolean>*/
 userId: string;

  constructor(private httpClient: HttpClient,
      private locationService: LocationService,
      private route: ActivatedRoute,
      private postService: PostService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get("userId");
    });

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
        zoom: this.zoom,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        clickableIcons: false
      };
      let map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      
      this.postService.GetMapPointsPostByUser(this.userId).subscribe(
        data => { 
          for (let i = 0; i < data.length; i++) {
            const beach = data[i];
            new google.maps.Marker({
              position: { lat: beach.location.lat, lng: beach.location.lng},
              map,
              icon: "../../../../assets/img/core-img/mapMarker.png",
              title: beach.title
            });
          }
        } 
      );


    });
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
