import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { ImagePostRequest } from 'src/app/model/post';
import {base64ToFile} from '../../../shared/cropper/blob.utils';

@Component({
  selector: 'app-modal-edit-image',
  templateUrl: './modal-edit-image.component.html',
  styleUrls: ['./modal-edit-image.component.css']
})
export class ModalEditImageComponent implements OnInit {

  aspectRatio: number = 4/3;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};

  @ViewChild('altImageInput') altImageInput: ElementRef<HTMLInputElement>;
  
  constructor(public dialogRef: MatDialogRef<ModalEditImageComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any) { 
  }
  
  ngOnInit(): void {
    this.initializeCropped(this.modalData.image);
  }

  getFormat(){
    this.aspectRatio = 5/4;
  }

  getFormatPanoramic(){
    this.aspectRatio = 16/9;
  }

  initializeCropped(event: any): void {
    this.imageChangedEvent = event;
    this.imageLoaded();
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    this.showCropper = true;
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
    if(this.scale > 1) {
      this.scale -= .1;
      this.transform = {
          ...this.transform,
          scale: this.scale
      };
    }
  }

  zoomIn() {
    this.scale += .1;
    this.transform = {
        ...this.transform,
        scale: this.scale
    };
  }

  deleteImage() {
    this.dialogRef.close();
  }

  closeModal() {
    let imagePost: ImagePostRequest = {
      firstImage: this.modalData.firstImage == true,
      imageBase64: this.croppedImage,
      altImage: this.altImageInput.nativeElement.value
    };

    this.dialogRef.close(imagePost);
  }

  saveImage () {
    let imagePost: ImagePostRequest = {
      firstImage: false,
      imageBase64: this.croppedImage,
      altImage: this.altImageInput.nativeElement.value
    };

    this.dialogRef.close(imagePost);
  }
}
