import { Component, OnInit } from '@angular/core';
import { PostPendingResponse } from 'src/app/model/post';
import { PendingService } from 'src/app/services/pending/pending.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-confirm-page',
  templateUrl: './confirm-page.component.html'
})

export class ConfirmPageComponent implements OnInit {

  
  pendingPosts: PostPendingResponse[];
  imagesPostUrl = environment.imagesPostUrl;

  constructor(private pendingService: PendingService) { }

  ngOnInit(): void {
    this.pendingService.GetToConfirm().subscribe(
      data =>{ 
        this.pendingPosts = data;
      } 
    );
  }
}
