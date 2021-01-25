import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalPostComponent } from '../modal-post/modal-post.component';
import { environment } from '../../../../environments/environment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post/post.service';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, first, map } from 'rxjs/operators';
import { LocationService } from 'src/app/services/location/location.service';
import { CommonDialogComponent } from '../../shared/common-dialog/common-dialog.component';
import { AccountService } from 'src/app/services/account/account.service';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html'
})

export class LandingPageComponent implements OnInit {

  apiLoaded: Observable<boolean>

  postForm: FormGroup;
  submitted = false;
  
  center: any;
  zoom = 15;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];
  display: any;

  labelCtrl = new FormControl();
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredLabel: Observable<string[]>;
  labels: string[] = [];
  allLabels: string[] = ['nature', 'birds', 'free', 'winter', 'river'];

  @ViewChild('labelInput') labelInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private postService: PostService, 
    private matDialog: MatDialog,
    private locationService: LocationService,
    private accountService: AccountService) { 
      
      this.setMapMarker();  
      
      this.filteredLabel = this.labelCtrl.valueChanges.pipe(
        //startWith(null),
        map((label: string | null) => label ? this._filter(label) : this.allLabels.slice()));
  }

  loadMap(){
    this.apiLoaded = this.httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=' + environment.googleApiKey, 'callback')
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
      labels: [null],
      userId: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      imageData: [''],
      altImage: [''],
      imageName: [''],
      observationDate: ['']
    });

    this.postForm.patchValue({
      'userId': this.accountService.userValue.id,
      'userName': this.accountService.userValue.id,
      'specieId': "336bfd7f-d88c-4d78-5b3e-08d8096731fb"
      });
  }

  setMapMarker() {
    this.locationService.getPosition().then(pos => {
      let latLng = {
        lat: pos.lat,
        lng: pos.lng
      };
      this.addMarkerCommon(latLng);
      this.center = latLng;
      
      //this.loadMap();
    });
  }

  addMarker(event: google.maps.MapMouseEvent) {
    this.display = event.latLng.toJSON();
    this.addMarkerCommon(event.latLng.toJSON())

    //this.postForm.controls.latitude.value(event.latLng.lat);
    //this.postForm.controls.longitude.value(event.latLng.lng);
  }

  addMarkerCommon(latLng){
    if(this.markerPositions.length > 0){
      this.markerPositions[0] = latLng;
    }else{
      this.markerPositions.push(latLng);
    }
  }

  onChangeEvent(){
    let latLng =
      {
        lat: Number(this.postForm.controls.latitude.value),
        lng: Number(this.postForm.controls.longitude.value)
      };

    this.addMarkerCommon(latLng);
    this.center = latLng;
  }

  onSubmit() {
    this.submitted = true; 
    
    if (this.postForm.invalid) {
        return;
    }

    //this.postForm.controls.labels. = this.labels;
    this.postForm.patchValue({
      'labels': this.labels
    });
    this.postService.AddPost(this.postForm.value)
        .pipe(first())
        .subscribe(
            data => {    
              this.openCommonModal('user.successSaveUserData');
            },
            error => {   
              if(error.status == "409"){
                this.openCommonModal('account.conflictNameMessage');
                this.postForm.controls.userName.setErrors({'incorrect': true});
              } else {
                this.openCommonModal('user.failUserAction');
              } 
            });

  }

  //get f() { return this.postForm.controls; }

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

  openCommonModal(message:string) {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "200px";
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

  /*labels*/
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.labels.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.labelCtrl.setValue(null);
  }

  remove(label: string): void {
    const index = this.labels.indexOf(label);

    if (index >= 0) {
      this.labels.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.labels.push(event.option.viewValue);
    this.labelInput.nativeElement.value = '';
    this.labelCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allLabels.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
}
