import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

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
  
  selectedFile: ImageSnippet;

  url: any;
  msg = "";
  imageName="";

  @ViewChild('labelInput') labelInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private postService: PostService, 
    private matDialog: MatDialog,
    private locationService: LocationService,
    private accountService: AccountService) { 
      
      //this.setMapMarker();  
      
      this.filteredLabel = this.labelCtrl.valueChanges.pipe(
        //startWith(null),
        map((label: string | null) => label ? this._filter(label) : this.allLabels.slice()));
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

  onSubmit() {
    this.submitted = true; 
    
    if (this.postForm.invalid) {
        return;
    }

    this.postForm.patchValue({
      'labels': this.labels,
      'imageData': this.url,
      'imageName': this.imageName
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

  /*Image*/
  selectFile(event) {
    if(!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }
    
    var mimeType = event.target.files[0].type;
    this.imageName = event.target.files[0].name;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result; 
       
    }
  }

  /*Map*/
  loadMap(){
    this.apiLoaded = this.httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=' + environment.googleApiKey, 'callback')
    .pipe(
      map(() => true),
      catchError((e) => of(false)),
    );
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

  addMarker(event: google.maps.MapMouseEvent) {
    this.display = event.latLng.toJSON();
    this.addMarkerCommon(event.latLng.toJSON())
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

  /*labels*/
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.labels.push(value.trim());
    }

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

  /*Modal form*/
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
}
