import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalPostComponent } from '../modal-post/modal-post.component';
import { environment } from '../../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post/post.service';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { LocationService } from 'src/app/services/location/location.service';
import { MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html'
})
export class LandingPageComponent implements OnInit {

  apiLoaded: Observable<boolean>

  postForm: FormGroup;
  submitted = false;
  
  center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  zoom = 15;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];

  display;


  addMarker1(latLng) {
    this.markerPositions.push(latLng);;
  }

  constructor(private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private postService: PostService, 
    private matDialog: MatDialog,
    private locationService: LocationService) { 

      
      locationService.getPosition().then(pos => {
        let latLng =
        {
          lat: pos.lat,
          lng: pos.lng,
          
        }
        this.center = latLng;
        
        this.display = latLng;
        this.addMarker1(latLng);
      });
         
      this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=' + environment.googleApiKey, 'callback')
      .pipe(
        map(() => true),
        catchError((e) => of(false)),
      );

    }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      text: ['', [Validators.required]],
      latitude: [''],
      longitude: [''],
      specieName: [''],
      specieId: [''],
      labels: ['', [Validators.required]],
      userId: [''],
      userName: [''],
      imageData: [''],
      altImage: [''],
      imageName: ['']
    });
  }

  addMarker(event: google.maps.MapMouseEvent) {
    this.display = event.latLng.toJSON();
    this.addmarkercommon(event.latLng.toJSON())

    //this.postForm.controls.latitude.value(event.latLng.lat);
    //this.postForm.controls.longitude.value(event.latLng.lng);
  }

  addmarkercommon(latLng){
    if(this.markerPositions.length > 0){
      this.markerPositions[0] = latLng;
    }else{
      this.markerPositions.push(latLng);
    }
  }

  onChangeEvent(event: any){
    let latLng =
      {
        lat: Number(this.postForm.controls.latitude.value),
        lng: Number(this.postForm.controls.longitude.value)
      };

    this.addmarkercommon(latLng);
    this.center = latLng;
  }

  onSubmit() {}

  get f() { return this.postForm.controls; }

  openPostForm() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "600px";
    dialogConfig.width = "900px";
    const dialogRef = this.matDialog.open(ModalPostComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      var wop = result;
    });
  }
}
