import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/user.service';
import { UserResponse } from 'src/app/model/user';

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
    private accountService: AccountService) { }

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
      location: ['']
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
          'registrationDate': data.registrationDate
          });

          if(data.photo !== ''){
            this.userImage = `https://treelive.blob.core.windows.net/${data.photo}`
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

  uploadFile (files) {
    if (files.length === 0) {
      return;
    }
 
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.userService.UploadImage(formData, this.accountService.userValue.id)
        .pipe(first())
        .subscribe(
            data => {
              let dataq = data;
                //this.alertService.success('Upload images successful', true);
                //this.loading = false;
            },
            error => {
                let errorw = error;
                //this.alertService.error(error);
                //this.loading = false;
            });
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
 
}


