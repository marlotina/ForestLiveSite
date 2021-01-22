import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalPostComponent } from '../modal-post/modal-post.component';
import { environment } from '../../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html'
})
export class LandingPageComponent implements OnInit {

  postForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private postService: PostService, 
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      text: ['', [Validators.required]],
      Latitude: [''],
      Longitude: [''],
      SpecieName: [''],
      SpecieId: [''],
      Labels: ['', [Validators.required]],
      UserId: [''],
      UserName: [''],
      ImageData: [''],
      AltImage: [''],
      ImageName: ['']
    });
  }

  onSubmit() {}

  get f() { return this.postForm.controls; }

  openPostForm() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "600px";
    dialogConfig.width = "900px";
    const dialogRef = this.matDialog.open(ModalPostComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      var wop = result;
    });
  }

}
