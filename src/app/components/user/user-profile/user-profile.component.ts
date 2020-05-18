import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account/account.service';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from '../../../../environments/environment';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalProfileComponent } from '../modal-profile/modal-profile.component';
import { ForgotRequest } from 'src/app/model/account';
import { CommonDialogComponent } from '../../shared/common-dialog/common-dialog.component';
import { TranslateService } from '@ngx-translate/core';

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
    private matDialog: MatDialog,
    private translate: TranslateService) { }

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
            this.userImage = `${environment.imagesProfileUrl}${data.photo}`
          } else {
            this.userImage ="../../../../assets/img/bg-img/profile.png";
          }

        },
        error => {
          this.translate.get('user.errorRetrieveInfo').subscribe((res: string) => {
            this.openLogoutModal(res);
          });
        });
  }

  get f() { return this.userProfileForm.controls; }

  onSubmit() {
    this.submitted = true; 
    
    if (this.userProfileForm.invalid) {
        return;
    }

    //this.loading = true;
    this.userService.UpdateUser(this.userProfileForm.value)
        .pipe(first())
        .subscribe(
            data => {    
              this.translate.get('user.successSaveUserData').subscribe((res: string) => {
                this.openLogoutModal(res);
              });
                //this.loading = false;
            },
            error => {    
              this.translate.get('user.failUserAction').subscribe((res: string) => {
                this.openLogoutModal(res);
              });
                //this.loading = false;
            });
  }
 
  openImageProfile() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "600px";
    dialogConfig.width = "900px";
    const dialogRef = this.matDialog.open(ModalProfileComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result == "REMOVE_IMAGE"){
        this.userImage = "../../../../assets/img/bg-img/profile.png";
      } else {
        if(result){
          this.userImage = `${environment.imagesProfileUrl}${result}`;
        }
      }
    });
  }

  recoverPassword() {
    let recoverRequest = new ForgotRequest();
    recoverRequest.email = this.accountService.userValue.email;
    this.userService.forgotPassword(recoverRequest).subscribe(
      data => {
        this.translate.get('user.resetPasswordOk').subscribe((res: string) => {
          this.openLogoutModal(res);
        });
      },
      error => { 
        this.translate.get('user.failUserAction').subscribe((res: string) => {
          this.openLogoutModal(res);
        });
        //this.loading = false;
      });
  }

  openLogoutModal(message:string) {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "200px";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      title: "Save user data",
      description: message,
      actionButtonText: "Ok"
    }
    
    this.matDialog.open(CommonDialogComponent, dialogConfig);
  }
}


