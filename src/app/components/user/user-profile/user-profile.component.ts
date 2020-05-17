import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/user.service';
import { UserResponse } from 'src/app/model/user';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalProfileComponent } from '../modal-profile/modal-profile.component';
import { ForgotRequest } from 'src/app/model/account';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {

  userProfileForm: FormGroup;
  submitted = false;
  userImage: string;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private accountService: AccountService,
    public matDialog: MatDialog) { }

  ngOnInit(): void {
    this.userProfileForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      email: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      userName: ['', [Validators.required]],
      name: [''],
      surname: [''],
      urlWebSite: ['', [Validators.required]],
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

    //TODO
    this.userService.getById(this.accountService.userValue.id).subscribe(
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
            'email': data.email,
            'userName':data.userName,
            'id':data.id,
            'lastModification': data.lastModification,
            'registrationDate': data.registrationDate,
            'twitterUrl': data.twitterUrl,
            'instagramUrl': data.instagramUrl,
            'linkedlinUrl': data.linkedlinUrl,
            'facebookUrl': data.facebookUrl
            });

          if(data.photo !== ''){
            this.userImage = `https://treelive.blob.core.windows.net/profiles/${data.photo}`
          } else {
            this.userImage ="../../../assets/img/bg-img/13.jpg";
          }

        },
        error => {
          let errorw = error;
          //this.alertService.error(error);
        });
  }

  get f() { return this.userProfileForm.controls; }

  onSubmit() {
    this.submitted = true; 
    // stop here if form is invalid
    if (this.userProfileForm.invalid) {
        return;
    }

    //this.loading = true;
    this.userService.UpdateUser(this.userProfileForm.value)
        .pipe(first())
        .subscribe(
            data => {
                //this.alertService.success('Registration successful', true);
                //this.loading = false;
                let wop = data;
            },
            error => {
                //this.alertService.error(error);
                //this.loading = false;
                let wop = error;
            });

    //this.alertService.success('user save data coreectly');
  }

  

  deleteImage() {
    this.userService.DeleteImage(this.accountService.userValue.id).subscribe(
      data => {
          //this.alertService.success('Delete images successful', true);
          //this.loading = false;
      },
      error => {
          //this.alertService.error(error);
          //this.loading = false;
      });;
  }
 
  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "600px";
    dialogConfig.width = "900px";
    const dialogRef = this.matDialog.open(ModalProfileComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.userImage = `https://treelive.blob.core.windows.net/profiles/${result}`;
      }
    });
  }

  recoverPassword() {
    let recoverRequest = new ForgotRequest();
    recoverRequest.Email = this.accountService.userValue.email;
    this.userService.forgotPassword(recoverRequest).subscribe(
      data => {
        let datas = data;
          //this.alertService.success('Delete images successful', true);
          //this.loading = false;
      },
      error => {
          let errors = error;
          //this.alertService.error(error);
          //this.loading = false;
      });
  }
}


