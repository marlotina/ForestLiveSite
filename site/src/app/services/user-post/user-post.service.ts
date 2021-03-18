import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { MapPoint } from 'src/app/model/Map';
import { ModalPostResponse } from 'src/app/model/post';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserPostService {

  constructor(private httpClient: HttpClient) { }

  GetModalBirdPost(postId : string, userId: string){
    return this.httpClient.get<ModalPostResponse>(`${environment.userPostApiUrl}api/v1/BirdUser/GetModalInfo/?postId=${postId}&userId=${userId}`)
      .pipe(map(data => {
        return data;
      }));
  }

  GetMapPointsPostByUser(userId: string){
    return this.httpClient.get<MapPoint[]>(`${environment.userPostApiUrl}api/v1/BirdUser/GetMapPoints/?userId=${userId}`)
      .pipe(map(data => {
        return data;
      }));
  }
}
