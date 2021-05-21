import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, first, map, switchMap } from 'rxjs/operators';
import { LocationService } from 'src/app/services/location/location.service';
import { CommonDialogComponent } from '../../shared/common-dialog/common-dialog.component';
import { AccountService } from 'src/app/services/account/account.service';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { startWith } from 'rxjs/operators';
import { ModalEditImageComponent } from '../modal-edit-image/modal-edit-image.component';
import { AutocompleteService } from 'src/app/services/autocomplete/autocomplete.service';
import { AutocompleteResponse } from 'src/app/model/specie';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLabelsService } from 'src/app/services/user/labels/user-labels.service';
import { ManageItemsService } from 'src/app/services/items/manage-items.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})

export class CreatePostComponent implements OnInit {

  //apiLoaded: Observable<boolean>

  postForm: FormGroup;
  submitted = false;
  
  center: any;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markers: google.maps.Marker[] = [];
  @ViewChild('mapWrapper') mapElement: ElementRef;
  zoom: number = 16;

  labelCtrl = new FormControl();
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredLabels: Observable<string[]>;
  labels: string[] = [];
  allLabels: string[] = [];
  visible = true;



  selectedFile: ImageSnippet;

  url: any;
  msg = "";
  imageName="";
  file: any;
  altImage = "";
  visibleEditImage = false;
  firstImage = true;
  map: google.maps.Map;
  userId: string;

  showMap = false;
  isPost = true;
  type: string;
  filteredSpecies: Observable<AutocompleteResponse[]>;
  autocompleteControl = new FormControl();
  toolPos = 'after';
  @ViewChild('labelInput') labelInput: ElementRef<HTMLInputElement>;
  @ViewChild('file') fileInput: ElementRef<HTMLInputElement>;
  @ViewChild('specieNamePost') specieNamePost: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;  
  @ViewChild('autoLabel') matAutoLabelcomplete: MatAutocomplete;

  constructor(private formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private locationService: LocationService,
    private accountService: AccountService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private manageItemsService: ManageItemsService,
    private userLabelsService: UserLabelsService,
    private autocompleteService: AutocompleteService) { 
      
      this.filteredLabels = this.labelCtrl.valueChanges.pipe(
        startWith(null),
        map((
          label: string | null) => 
          label ? this._filter(label) : this.allLabels.slice()
          ));

  }  
  
  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(params => {
      this.type = params.get("type");
        });

    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      text: ['', [Validators.required]],
      latitude: [null],
      longitude: [null],
      specieName: [''],
      specieId: [null],
      labels: [null],
      userId: ['', [Validators.required]],
      imageData: [''],
      altImage: [''],
      imageName: [''],
      observationDate: [null],
      isPost: [''],
      type: ['']
    });
    
    this.userId = this.accountService.userValue.userId;
    
    this.postForm.patchValue({
      'userId': this.userId
      });

    this.userLabelsService.GetLabelsAutocomplete(this.userId)
      .pipe(first())
      .subscribe(
          data => {    
            this.allLabels = data;
          },
          error => { 

           });

    this.filteredSpecies = this.autocompleteControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => {
        if (value !== '' && value.nameComplete == null) {
          return this.getSpecies(value);
        } else {
          return of([]);
        }
      })
    );

    this.getLocation();
  }

  selectSpecie(item: AutocompleteResponse){
    this.postForm.controls['specieName'].setValue(item.nameComplete);
    this.postForm.controls['specieId'].setValue(item.specieId);
  }

  optionClicked(event: Event, specie: AutocompleteResponse) {
    event.stopPropagation();
  }

  getSpecies(value: any): Observable<AutocompleteResponse[]> {
    if(value != '' && value.length > 2) {
      return this.autocompleteService.GetSpeciesByKeys(value.toLowerCase(), localStorage.getItem('locale'))
        .pipe(map(results => results),
          catchError(_ => {
            return of([]);
          }
        )
      );
    }

    return of([]);
  }

  onSubmit() {
    this.submitted = true; 
    
    if (this.postForm.invalid) {
        return;
    }

    this.postForm.patchValue({
      'labels': this.labels,
      'imageData': this.url,
      'imageName': this.imageName,
      'altImage': this.altImage,
      'isPost': this.isPost
    });

    if(this.type == "post") { 
      this.postForm.controls['type'].setValue('post');
      
    } else if (this.type == "soecie") {
      this.postForm.controls['type'].setValue('bird');
    } else if (this.type == "pending") {
      this.postForm.controls['type'].setValue('pending');
    }
    
    this.manageItemsService.addPost(this.postForm.value)
    .pipe(first())
    .subscribe(
        data => {    
          this.manageSuccess(data.userId, data.postId);
        },
        error => {   
          this.manageError(error.status);
        });
    
  }

  manageSuccess(userId: string, postId: string){
    this.router.navigate([`${userId}/${postId}`]);
  }

  manageError(errorStatus: string){
    if(errorStatus == "409"){
      this.openCommonModal('account.conflictNameMessage');
      this.postForm.controls.userName.setErrors({'incorrect': true});
    } else {
      this.openCommonModal('user.failUserAction');
    } 
    this.submitted = true; 
  }

  get f() { return this.postForm.controls; }

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
      //this.url = reader.result; 
    }
    this.visibleEditImage =true;
    this.file = event;

    this.openEditImage();
  }

  deleteImage(){
    this.url = '';
    this.file = null;
    this.fileInput.nativeElement.value = null;
    this.visibleEditImage = false;
    this.firstImage = true;
  }

  /*Map*/

  getLocation() {
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


  initMap(latLng: any) {
      const mapOptions: google.maps.MapOptions = {
        center: latLng,
        zoom: this.zoom,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        clickableIcons: false
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      
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
    this.postForm.controls.latitude.setValue(latLng.lat());
    this.postForm.controls.longitude.setValue(latLng.lng());

    this.addMarkerCommon(marker);
  }

  showHideMap() {
    if(!this.showMap){
      this.postForm.controls.latitude.setValue(null);
      this.postForm.controls.longitude.setValue(null);
      this.setMapOnAll(null);
      this.markers = [];
    }

    this.showMap = !this.showMap;
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
        lat: Number(this.postForm.controls.latitude.value),
        lng: Number(this.postForm.controls.longitude.value)
      };

    const marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
    });

    this.addMarkerCommon(marker);
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

    return this.allLabels.filter(label => label.toLowerCase().indexOf(filterValue) === 0);
  }

  /*Modal form*/
  openEditImage() {
    const dialogConfig = new MatDialogConfig();
    let results: string;
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "650px";
    dialogConfig.width = "850px";
    dialogConfig.data = {
      image: this.file,
      firstImage: this.firstImage
    }
    
    const dialogRef = this.matDialog.open(ModalEditImageComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.firstImage = result.firstImage;
      if(!this.firstImage){
        this.url = result.imageBase64;
        this.altImage = result.altImage;
        if(result.imageName != null && result.imageName != "") {
          this.imageName = result.imageName;
        }
      }else{
        this.visibleEditImage = false;
      }
    });

    return results;
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
}
