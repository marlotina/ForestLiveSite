import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalProfileComponent } from '../modal-profile/modal-profile.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CommonDialogComponent } from '../../shared/common-dialog/common-dialog.component';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    UserProfileComponent,
    ModalProfileComponent,
    CommonDialogComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ImageCropperModule,
    RouterModule,
    HttpClientJsonpModule,
    MatDatepickerModule
  ],
  entryComponents: [ModalProfileComponent]
})
export class UserProfileModule { }


