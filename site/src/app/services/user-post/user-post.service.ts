import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { MapPoint } from 'src/app/model/Map';
import { BirdSpeciePostResponse, ModalPostResponse, PostResponse } from 'src/app/model/post';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserPostService {

  constructor(private httpClient: HttpClient) { }

  getModalBirdPost(postId : string, userId: string){
    return this.httpClient.get<ModalPostResponse>(`${environment.userPostApiUrl}api/v1/BirdUser/GetModalInfo/?postId=${postId}&userId=${userId}`)
      .pipe(map(data => {
        return data;
      }));
  }

  getMapPointsPostByUser(userId: string){
    return this.httpClient.get<MapPoint[]>(`${environment.userPostApiUrl}api/v1/BirdUser/GetMapPoints/?userId=${userId}`)
      .pipe(map(data => {
        return data;
      }));
  }

  getPostsByLabel(userId: string, label: string){
    return this.httpClient.get<PostResponse[]>(`${environment.userPostApiUrl}api/v1/BirdUser/GetPostsByLabel/?label=${label}&userId=${userId}`)
      .pipe(map(data => {
        return data;
      }));
  }

  getPostsByUser(userId: string){
    return this.httpClient.get<PostResponse[]>(`${environment.userPostApiUrl}api/v1/BirdUser/GetPosts/?userId=${userId}`)
      .pipe(map(data => {
        return data;
      }));
  }
}
