import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';

import { Dimensions } from '../../../shared/cropper/Dimensions';
import { ImageTransform } from '../../../shared/cropper/ImageTransform';
import { base64ToFile } from '../../../shared/cropper/blob.utils';
import { UserService } from 'src/app/services/user/profile/user.service';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account/account.service';
import { ImageProfileRequest } from 'src/app/model/user';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-modal-profile',
  templateUrl: './modal-profile.component.html',
  styleUrls: ['./modal-profile.component.css']
})
export class ModalProfileComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  nameFile: string;
  visibleEditImage = false;
  showErrorExtensionImage: boolean;
  hasImage: false;
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<ModalProfileComponent>,
    private userService: UserService,
    private loaderService: LoaderService,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    private accountService: AccountService) {
      this.hasImage = this.modalData.hasImage;
     }

  ngOnInit() {
  }

    fileChangeEvent(event: any): void {
      let extensionFile = event.currentTarget.files[0].type;
      if (extensionFile == "image/jpg" || extensionFile == "image/jpeg" || extensionFile == "image/png") {
        this.showErrorExtensionImage = false;
        this.imageChangedEvent = event;
        this.nameFile = event.currentTarget.files[0].name;  
        this.visibleEditImage = true;
      } else {
        this.showErrorExtensionImage = true;
      }
    }

    imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      console.log(event, base64ToFile(event.base64));
    }

    imageLoaded() {
      this.showCropper = true;
      console.log('Image loaded');
    }

    cropperReady(sourceImageDimensions: Dimensions) {
      console.log('Cropper ready', sourceImageDimensions);
    }

    loadImageFailed() {
      console.log('Load failed');
    }

    resetImage() {
      this.scale = 1;
      this.rotation = 0;
      this.canvasRotation = 0;
      this.transform = {};
    }

    zoomOut() {
      this.scale -= .1;
      this.transform = {
          ...this.transform,
          scale: this.scale
      };
    }

    zoomIn() {
      this.scale += .1;
      this.transform = {
          ...this.transform,
          scale: this.scale
      };
    }

    deleteImage() {
      this.deleteFile();
      this.dialogRef.close();
    }

    closeModal() {
      this.dialogRef.close();
    }

    updateImage () {
      if (!this.croppedImage) {
        return;
      }
      this.isLoading = true; 
      this.loaderService.show();      

      let imageProfileRequest: ImageProfileRequest = {
        userId: this.accountService.userValue.id,
        imageBase64: this.croppedImage,
        imageName: this.nameFile,
        userName: this.accountService.userValue.userId
      };

      this.userService.UploadImage(imageProfileRequest)
          .pipe(first())
          .subscribe(
              data => {
                //this.loading = false;
                this.dialogRef.close(`${imageProfileRequest.userName}.jpg`);
                this.loaderService.hide(); 
                this.isLoading = false; 
              },
              error => {
                this.dialogRef.close(`profile.jpg`);
                this.loaderService.hide(); 
                this.isLoading = false; 
                //this.loading = false;
              });
    }

    deleteFile(){
      this.isLoading = true; 
      this.loaderService.show(); 

      this.userService.DeleteImage(this.accountService.userValue.id)
          .pipe(first())
          .subscribe(
              data => {
                this.dialogRef.close("REMOVE_IMAGE");
                this.loaderService.hide(); 
                this.isLoading = false; 
                //this.loading = false;
              },
              error => {
                this.dialogRef.close();
                this.loaderService.hide(); 
                this.isLoading = false; 
                //this.loading = false;
      });
    }
}
