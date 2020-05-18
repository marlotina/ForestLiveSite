import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';

import { Dimensions } from '../cropper/Dimensions';
import { ImageTransform } from '../cropper/ImageTransform';
import {base64ToFile} from '../cropper/blob.utils';
import { UserService } from 'src/app/services/user/user.service';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account/account.service';
import { ImageProfileRequest } from 'src/app/model/user';

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
  extensionFile: string;
  constructor(public dialogRef: MatDialogRef<ModalProfileComponent>,
    private userService: UserService,
    private accountService: AccountService) { }

  ngOnInit() {
  }

    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
        this.nameFile = event.currentTarget.files[0].name;
        this.extensionFile = this.nameFile.split('.')[1];
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

      let imageProfileRequest: ImageProfileRequest = {
        userId: this.accountService.userValue.id,
        imageBase64: this.croppedImage,
        imageName: this.nameFile
      };

      this.userService.UploadImage(imageProfileRequest)
          .pipe(first())
          .subscribe(
              data => {
                  //this.loading = false;
                  this.dialogRef.close(`${imageProfileRequest.userId}.${this.extensionFile}`);
              },
              error => {
                  let errorw = error;
                  //this.loading = false;
              });
    }

    deleteFile(){
      this.userService.DeleteImage(this.accountService.userValue.id)
          .pipe(first())
          .subscribe(
              data => {
                this.dialogRef.close(null);
                  //this.loading = false;
              },
              error => {
                  let errorw = error;
                  //this.alertService.error(error);
                  //this.loading = false;
      });
    }
}
