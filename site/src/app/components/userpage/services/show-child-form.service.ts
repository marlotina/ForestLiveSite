import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowChildFormService {
  // Observable string streams
  private visibleFormCreatedPost = new Subject<boolean>();
  
  constructor() { }
  
  // Observable string sources
  visibleFormCreatedPost$ = this.visibleFormCreatedPost.asObservable();

  // Service message commands
  ShowForm(show: boolean) {
    this.visibleFormCreatedPost.next(show);
  }
}
