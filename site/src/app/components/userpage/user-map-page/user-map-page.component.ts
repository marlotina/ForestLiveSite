import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { LocationService } from 'src/app/services/location/location.service';
import { GetpostService } from 'src/app/services/posts/getpost.service';
import { UserInteractionsService } from 'src/app/services/user-interactions/user-interactions.service';
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
      private userInteractionsService: UserInteractionsService,
      private route: ActivatedRoute,
      private userPostService: GetpostService) { }

  ngOnInit(): void {
    this.loaderService.show();
    this.route.paramMap.subscribe(params => {
      this.userId = params.get("userId");
      this.userInteractionsService.GetUserMapById(this.userId).subscribe(
        data =>{
          this.getLocation(data.latitude, data.longitude);
        }
      )
    });

  }

  getLocation(lat:number, lng: number) {
    if(lat > 0 && lng > 0){
      let latLng =
      {
        lat: lat,
        lng: lng
      };
      this.initMap(latLng);
    }else{
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
  }

  initMap(latLng: any) {

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
              icon: "../../../../assets/img/core-img/marker.png"
              //title: post.postId
            });

            marker.addListener("click", () => {
              this.getInfoPost(marker, map, post.postId, post.userId);
            });
          }
        } 
      );

      google.maps.event.addListenerOnce(map, 'tilesloaded', () => {
        this.loaderService.hide();
      });
  }

  getInfoPost(marker: google.maps.Marker, map: google.maps.Map, postId: string, userId: string){
    this.userPostService.getModalBirdPost(postId, userId).subscribe(data => {
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
}
