import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { UserLabelRequest, UserLabelResponse } from 'src/app/model/user';
import { AccountService } from 'src/app/services/account/account.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserLabelsService } from 'src/app/services/user/labels/user-labels.service';
import { CommonDialogComponent } from '../../shared/common-dialog/common-dialog.component';

@Component({
  selector: 'app-user-labels',
  templateUrl: './user-labels.component.html',
  styleUrls: ['./user-labels.component.css']
})
export class UserLabelsComponent implements OnInit {

  userLabels: UserLabelResponse[];
  hasNotLabels = false;
  
  labelForm: FormGroup;

  constructor(
    private loaderService: LoaderService,
    private userLabelsService: UserLabelsService,
    private matDialog: MatDialog,
    private formBuilder: FormBuilder,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.loaderService.show();
    let userId = this.accountService.userValue.userId;
    this.userLabelsService.GetUserLabelsDetails(userId).subscribe(
      data =>{ 
        if(data.length > 0){
          this.hasNotLabels = true;
        }
        this.userLabels = data;
        this.loaderService.hide();
      } 
    );

    this.labelForm = this.formBuilder.group({
      label: ['', [Validators.required]],
      userId: ['', [Validators.required]]
    });

    this.labelForm.patchValue({
      'userId': userId
      });
  }

  onSubmit() {
    if (this.labelForm.invalid) {
        return;
    }

    this.userLabelsService.AddLabel(this.labelForm.value)
        .pipe(first())
        .subscribe(
            data => {    
              this.userLabels.push(data);
              this.labelForm.controls.label.setValue('');
            },
            error => {   
              if(error.status == "409"){} else {
                this.openCommonModal('user.failUserAction');
              } 
            });
  }

  removeLabel(userLabel: UserLabelResponse){
    this.userLabelsService.DeleteLabel(userLabel.label, userLabel.userId).subscribe(
      data => {
        if(data){
          const index = this.userLabels.indexOf(userLabel, 0);
          if (index > -1) {
            this.userLabels.splice(index, 1);
          }
        }
      },
      error => {   
        if(error.status == "409"){} else {
          this.openCommonModal('user.failUserAction');
        } 
        if(error.status == "403"){} else {
          this.openCommonModal('user.failUserAction');
        } 
      }
    )
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
