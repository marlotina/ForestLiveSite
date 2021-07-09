import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account/account.service';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/profile/user.service';
import { environment } from '../../../../environments/environment';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalProfileComponent } from '../modal-profile/modal-profile.component';
import { ForgotRequest } from 'src/app/model/account';
import { CommonDialogComponent } from '../../shared/common-dialog/common-dialog.component';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userProfileForm: FormGroup;
  submitted = false;
  userImage: string;
  userEmail: string;
  userProfileUrlImage = null;
  image: string;

  map: google.maps.Map;
  markers: google.maps.Marker[] = [];
  @ViewChild('mapWrapper') mapElement: ElementRef;

  constructor(
    private locationService: LocationService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private accountService: AccountService,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.userProfileForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      name: [''],
      surname: [''],
      urlWebSite: [''],
      lastModification: [''],
      isCompany: ['', [Validators.required]],
      registrationDate: [''],
      languageId: [''],
      description: [''],
      photo: [''],
      location: [''],
      twitterUrl: [''],
      instagramUrl: [''],
      linkedlinUrl: [''],
      facebookUrl: [''],
      latitude: [''],
      longitude: ['']
    });

    this.userEmail = this.accountService.userValue.email;
    this.userService.GetByUserId(this.accountService.userValue.userId).subscribe(
      data => {
          this.userProfileForm.patchValue({
            'name': data.name,
            'surname': data.surname,
            'urlWebSite': data.urlWebSite,
            'isCompany': data.isCompany, 
            'languageId': data.languageId,
            'description': data.description,
            'photo': data.photo,
            'location': data.location,
            'userName':data.userName,
            'id':data.id,
            'lastModification': data.lastModification,
            'registrationDate': data.registrationDate,
            'twitterUrl': data.twitterUrl,
            'instagramUrl': data.instagramUrl,
            'linkedlinUrl': data.linkedlinUrl,
            'facebookUrl': data.facebookUrl,
            'latitude': data.latitude,
            'longitude': data.longitude
            });

          this.userImage = environment.imagesProfileUrl + data.photo;
          this.image = data.photo;
          
        this.getLocation(data.latitude, data.longitude);
        },
        error => {
          this.openCommonModal('user.errorRetrieveInfo');
        });
        
  }

  get f() { return this.userProfileForm.controls; }

  onSubmit() {
    this.submitted = true; 
    
    if (this.userProfileForm.invalid) {
        return;
    }
    
    this.userService.UpdateUser(this.userProfileForm.value)
        .pipe(first())
        .subscribe(
            data => {    
              this.submitted = false; 
            },
            error => {   
              if(error.status == "409"){
                this.openCommonModal('account.conflictNameMessage');
                this.userProfileForm.controls.userName.setErrors({'incorrect': true});
              } else {
                this.openCommonModal('user.failUserAction');
              } 
            });
  }
  
 
  openImageProfile() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      imageName: this.image
    }
    const dialogRef = this.matDialog.open(ModalProfileComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result == "REMOVE_IMAGE"){
        this.userImage = environment.imagesProfileUrl + "profile.png";
        this.accountService.updateImage("profile.png");
      } else {
        if(result){
          this.userImage = environment.imagesProfileUrl + result;
          this.image = result;
          this.accountService.updateImage(result);
        }
      }
      
    });
  }

  recoverPassword() {
    let recoverRequest = new ForgotRequest();
    recoverRequest.email = this.accountService.userValue.email;
    this.userService.ForgotPassword(recoverRequest).subscribe(
      data => {
        this.openCommonModal('user.resetPasswordOk');
      },
      error => { 
        this.openCommonModal('user.failUserAction');
        //this.loading = false;
      });
  }

  openCommonModal(message:string) {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      title: "user.userTitleModal",
      description: message,
      acceptButtonText: "general.ok",
      hideAcceptButton: false,
      hideCancelButton: true
    }
    
    this.matDialog.open(CommonDialogComponent, dialogConfig);
  }

  deleteUser(){
    this.deleteCommonModal('user.deleteProfile');
  }

  deleteCommonModal(message:string) {
    const dialogConfig = new MatDialogConfig();
    let results: string;
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "200px";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      title: "user.titleDeleteModal",
      description: message,
      cancelButtonText: "general.cancel",
      acceptButtonText: "general.delete",
      hideAcceptButton: false,
      hideCancelButton: false
    }
    
    const dialogRef = this.matDialog.open(CommonDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result == "ACCEPT"){
        this.userService.DeleteUser(this.accountService.userValue.id).subscribe(
          data => {
            this.openCommonModal('user.userDeleted');
            this.accountService.Logout();
          },
          error => { 
            this.openCommonModal('user.failUserAction');
          });
      }
    });

    return results;
  }

  getLocation(lat:number, lng: number) {

    if(lat > 0 && lng > 0){
      let latLng: google.maps.LatLngLiteral = {
        lat: Number.parseFloat(lat.toString()),
        lng: Number.parseFloat(lng.toString())
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
        zoom: 16,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        clickableIcons: false
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      
      this.addMarker(latLng, this.map);

      google.maps.event.addListener(this.map, "click", (event) => {
        this.addMarker(event.latLng, this.map);
      });
  }

  addMarker(location: google.maps.LatLngLiteral, map: google.maps.Map) {
    const marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon:  "../../../../assets/img/core-img/marker.svg"
    });

    var latLng = marker.getPosition();
    this.userProfileForm.controls.latitude.setValue(latLng.lat());
    this.userProfileForm.controls.longitude.setValue(latLng.lng());

    this.addMarkerCommon(marker);
  }

  setMapOnAll(map: google.maps.Map | null) {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  addMarkerCommon(marker: google.maps.Marker){
    if(this.markers.length > 0){
      this.setMapOnAll(null);
      this.markers = [];
    }
    
      this.markers.push(marker);
  }

  onChangeEvent(){
    let latLng =
      {
        lat: Number(this.userProfileForm.controls.latitude.value),
        lng: Number(this.userProfileForm.controls.longitude.value)
      };

    const marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
    });

    this.addMarkerCommon(marker);
  }
}


