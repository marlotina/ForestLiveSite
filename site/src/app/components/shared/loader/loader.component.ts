import { Component, OnInit } from '@angular/core';
import {LoaderService} from '../../../services/loader/loader.service';
import { BehaviorSubject, Subject  } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  isLoading: BehaviorSubject<boolean> = this.loaderService.isLoading;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
  }

}
