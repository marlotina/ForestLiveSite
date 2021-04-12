import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { LocationService } from 'src/app/services/location/location.service';
import { UserPostService } from 'src/app/services/user-post/user-post.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-map-page',
  templateUrl: './user-map-page.component.html',
  styleUrls: ['./user-map-page.component.css']
})
export class UserMapPageComponent implements OnInit {
  
  infoContent: string;
  @ViewChild('mapWrapper') mapElement: ElementRef;
  zoom: number = 16;
  infowindow = new google.maps.InfoWindow();

  userId: string;

  constructor(
      private loaderService: LoaderService,
      private locationService: LocationService,
      private route: ActivatedRoute,
      private userPostService: UserPostService) { }

  ngOnInit(): void {
    this.loaderService.show();
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
      
      this.userPostService.getMapPointsPostByUser(this.userId).subscribe(
        data => { 
          for (let i = 0; i < data.length; i++) {
            const post = data[i];
            const marker = new google.maps.Marker({
              position: { lat: post.location.lat, lng: post.location.lng},
              map,
              icon: "../../../../assets/img/core-img/marker.svg",
              title: post.postId
            });

            marker.addListener("click", () => {
              this.getInfoPost(marker, map);
            });
          }
        } 
      );

      google.maps.event.addListenerOnce(map, 'tilesloaded', () => {
        this.loaderService.hide();
      });
    });
  }

  getInfoPost(marker: google.maps.Marker, map: google.maps.Map){
    var postId = marker.getTitle();
    this.userPostService.getModalBirdPost(postId, this.userId).subscribe(data => {
        const modal = `<div style='float:left'><img style='width: 100px;' src='${environment.imagesPostUrl}${data.imageUrl}' alt='${data.altImage}'>`+ 
        `</div><div style='float:right; padding: 10px;'><b><a target='_blank' href='/${data.userId}/post/${data.postId}'>${data.title}</a></b><br/>${data.text}<br/> ${data.birdSpecie}</div>`;
        this.infowindow.setContent(modal);
        this.infowindow.open(map, marker);
    })
  }
}
