import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PostHomeResponse } from 'src/app/model/post';
import { BirdserviceService } from 'src/app/services/bird/birdservice.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { environment } from 'src/environments/environment';
import { ImageDialogComponent } from '../shared/image-dialog/image-dialog.component';

@Component({
  selector: 'app-last-posts',
  templateUrl: './last-posts.component.html',
  styleUrls: ['./last-posts.component.css']
})
export class LastPostsComponent implements OnInit {

  imagesPostUrl = environment.imagesPostUrl;
  imagesProfileUrl = environment.imagesProfileUrl;
  lastObservations: PostHomeResponse[] = []

  constructor(
    private birdService: BirdserviceService,
    private matDialog: MatDialog,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.loaderService.show();
    this.birdService.GetLastbirds().subscribe(
      data => {
        this.lastObservations = data;
        this.loaderService.hide();
      }
    )
  }

  showImage(imageUrl: string) {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    
    dialogConfig.data = {
      image: this.imagesPostUrl + imageUrl
    }
    
    this.matDialog.open(ImageDialogComponent, dialogConfig);
  }
}