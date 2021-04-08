import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PostResponse } from 'src/app/model/post';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetItemsService {

  constructor(private httpClient: HttpClient) { 
  }

  GetBird(postId : string, specieId: string){
    return this.httpClient.get<PostResponse>(`${environment.birdApiUrl}api/v1/SpeciesSearch/GetPost?postId=${postId}&specieId=${specieId}`)
      .pipe(map(data => {
        return data;
      }));
  }

  getPost(postId: string){
    return this.httpClient.get<PostResponse>(`${environment.postApiUrl}api/v1/BirdPost/GetPost/?postId=${postId}`)
      .pipe(map(data => {
        return data;
      }));
  }

  GetPending(postId : string){
    return this.httpClient.get<PostResponse>(`${environment.birdPendingApiUrl}api/v1/PendingSearch/GetPost?postId=${postId}`)
      .pipe(map(data => {
        return data;
      }));
  }
}
