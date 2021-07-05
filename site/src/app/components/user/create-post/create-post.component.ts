import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, first, map, switchMap } from 'rxjs/operators';
import { LocationService } from 'src/app/services/location/location.service';
import { CommonDialogComponent } from '../../shared/common-dialog/common-dialog.component';
import { AccountService } from 'src/app/services/account/account.service';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { startWith } from 'rxjs/operators';
import { ModalEditImageComponent } from '../modal-edit-image/modal-edit-image.component';
import { AutocompleteService } from 'src/app/services/autocomplete/autocomplete.service';
import { AutocompleteResponse, CountryItem } from 'src/app/model/specie';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLabelsService } from 'src/app/services/user/labels/user-labels.service';
import { ManageItemsService } from 'src/app/services/items/manage-items.service';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})

export class CreatePostComponent implements OnInit {

  //apiLoaded: Observable<boolean>

  postForm: FormGroup;
  submitted = false;
  
  markers: google.maps.Marker[] = [];
  @ViewChild('mapWrapper') mapElement: ElementRef;

  labelCtrl = new FormControl();
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredLabels: Observable<string[]>;
  labels: string[] = [];
  allLabels: string[] = [];
  sizeError = false;


  url: any;
  imageName="";
  file: any;
  altImage = "";
  visibleEditImage = false;
  firstImage = true;
  map: google.maps.Map;
  userId: string;
  specieId: string = null;
  specieName: string = null;
  showMap = false;
  isPost = true;
  filteredSpecies: Observable<AutocompleteResponse[]>;
  specieAutocompleteControl = new FormControl();
  toolPos = 'after';
  @ViewChild('labelInput') labelInput: ElementRef<HTMLInputElement>;
  @ViewChild('file') fileInput: ElementRef<HTMLInputElement>;

  countries: CountryItem[] = [];
  filteredCountries: Observable<CountryItem[]>;
  countryCode: string;
  countryAutocompleteControl = new FormControl();

  searchSpecie: number = 1
  constructor(
    private formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private locationService: LocationService,
    private accountService: AccountService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private manageItemsService: ManageItemsService,
    private userLabelsService: UserLabelsService,
    private autocompleteService: AutocompleteService) { 
      
      this.filteredLabels = this.labelCtrl.valueChanges.pipe(
        startWith(''),
        map((
          label: string | null) => 
          label ? this._filterLabel(label) : this.allLabels.slice()
          ));
      
      
  }  
  
  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(params => {
      let type = params.get("type");
      this.isPost = type == 'post'
        });

    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      text: ['', [Validators.required]],
      latitude: [null],
      longitude: [null],
      countryCode: [null],
      specieName: [''],
      specieId: [null],
      labels: [null],
      userId: ['', [Validators.required]],
      imageData: [''],
      altImage: [''],
      imageName: [''],
      observationDate: [null],
      isPost: ['']
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

    this.autocompleteService.GetCountries(localStorage.getItem('locale'))
    .pipe(first())
    .subscribe(
        data => {    
          this.countries = data;
        },
        error => { 

        });

    this.filteredSpecies = this.specieAutocompleteControl.valueChanges.pipe(
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

    this.filteredCountries = this.countryAutocompleteControl.valueChanges.pipe(
      startWith(''),
      map((
        country: string | null) => 
        country ? this._filterCountry(country) : this.countries.slice()
        ));

    this.getLocation();
  }

  selectedCountry(event: MatAutocompleteSelectedEvent): void {
    this.countryCode = event.option.value.countryId;
    this.countryAutocompleteControl.setValue(event.option.value.name);
  }

  selectSpecie(item: AutocompleteResponse){
    this.specieAutocompleteControl.setValue(item.nameComplete);
    this.specieId = item.specieId;
    this.specieName = item.nameComplete;
  }

  optionClicked(event: Event, specie: AutocompleteResponse) {
    event.stopPropagation();
  }


  getSpecies(value: any): Observable<AutocompleteResponse[]> {
    if(value != '' && value.length > 2) {
      if(this.searchSpecie == 1){
        return this.autocompleteService.GetSpeciesByName(value.toLowerCase(), localStorage.getItem('locale'))
          .pipe(map(results => results),
            catchError(_ => {
              return of(null);
            }
          )
        );
      }else{
        return this.autocompleteService.GetSpeciesByScienceName(value.toLowerCase(), localStorage.getItem('locale'))
          .pipe(map(results => results),
            catchError(_ => {
              return of(null);
            }
          )
        );
      }
    }

    return of([]);
  }

  changeSearchSpecie(e: any){
    this.searchSpecie = e.target.value;
  }

  onSubmit() {
    this.submitted = true; 
    
    if (this.postForm.invalid) {
        this.submitted = false;
        return;
    }

    this.postForm.patchValue({
      'labels': this.labels,
      'imageData': this.url,
      'imageName': this.imageName,
      'altImage': this.altImage,
      'isPost': this.isPost,
      'specieId': this.specieId,
      'specieName': this.specieName,
      'countryCode': this.countryCode
    });
    
    this.manageItemsService.addPost(this.postForm.value)
    .pipe(first())
    .subscribe(
        data => {    
          this.manageSuccess(data.userId, data.postId);
          this.submitted = false;
        },
        error => {   
          this.manageError(error.status);
          this.submitted = false;
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
    let sizeImage = event.target.files[0].size;
    if(sizeImage / 1024 < 3072){
      this.sizeError = false;
    }else{
      this.sizeError = true;
      return;
    }
    
    var mimeType = event.target.files[0].type;
    this.imageName = event.target.files[0].name;

    if (mimeType.match(/image\/*/) == null) {
      //this.msg = "Only images are supported";
      return;
    }
    
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
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
        zoom: 16,
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

  private _filterLabel(value: string): string[] {
    const filterValue = value.toLowerCase();
    var result = this.allLabels.filter(label => label.toLowerCase().indexOf(filterValue) === 0);
    return result;
  }

  private _filterCountry(value: string): CountryItem[] {
    const filterValue = value.toLowerCase();
    var result = this.countries.filter(country => country.name.toLowerCase().indexOf(filterValue) === 0);
    return result;
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
      if(result != null) {
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
      } else {
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
