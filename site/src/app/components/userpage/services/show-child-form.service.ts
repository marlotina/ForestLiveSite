import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PostResponse } from 'src/app/model/post';

@Injectable({
  providedIn: 'root'
})
export class ShowChildFormService {
  // Observable string streams
  private createdPost = new Subject<PostResponse>();
  
  constructor() { }
  
  // Observable string sources
  createdPost$ = this.createdPost.asObservable();

  // Service message commands
  PostCreated(postResponse: PostResponse) {
    this.createdPost.next(postResponse);
  }
}
