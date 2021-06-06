import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account/account.service';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/profile/user.service';
import { environment } from '../../../../environments/environment';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalProfileComponent } from '../modal-profile/modal-profile.component';
import { ForgotRequest } from 'src/app/model/account';
import { CommonDialogComponent } from '../../shared/common-dialog/common-dialog.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {

  userProfileForm: FormGroup;
  submitted = false;
  userImage: string;
  userEmail: string;
  userProfileUrlImage = environment.imagesProfileUrl;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private accountService: AccountService,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.userProfileForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      userName: ['', [Validators.required]],
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
      facebookUrl: ['']
    });

    this.userEmail = this.accountService.userValue.email;
    this.userService.GetById(this.accountService.userValue.id).subscribe(
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
            'facebookUrl': data.facebookUrl
            });

          this.userImage = data.photo;

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
      hasImage: this.userImage != "profile.png"
    }
    const dialogRef = this.matDialog.open(ModalProfileComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result == "REMOVE_IMAGE"){
        this.userImage = "profile.png";
      } else {
        if(result){
          this.userImage = `${result}`;
          this.accountService.updateImage(this.userImage);
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
}


