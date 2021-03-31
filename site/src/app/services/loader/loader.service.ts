import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isLoading = new BehaviorSubject<boolean>(true);

  show() {
    console.log('true');
    this.isLoading.next(true);
  }

  hide() {
    console.log('false');
    this.isLoading.next(false);
  }

  constructor() { }
}
