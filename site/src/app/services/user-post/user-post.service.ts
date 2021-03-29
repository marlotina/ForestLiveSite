import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { MapPoint } from 'src/app/model/Map';
import { PostListResponse, ModalPostResponse } from 'src/app/model/post';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserPostService {

  constructor(private httpClient: HttpClient) { }

  getModalBirdPost(postId : string, userId: string){
    return this.httpClient.get<ModalPostResponse>(`${environment.userPostApiUrl}api/v1/UserPosts/GetModalInfo/?postId=${postId}&userId=${userId}`)
      .pipe(map(data => {
        return data;
      }));
  }

  getMapPointsPostByUser(userId: string){
    return this.httpClient.get<MapPoint[]>(`${environment.userPostApiUrl}api/v1/UserPosts/GetMapPoints/?userId=${userId}`)
      .pipe(map(data => {
        return data;
      }));
  }

  getPostsByLabel(userId: string, label: string){
    return this.httpClient.get<PostListResponse[]>(`${environment.userPostApiUrl}api/v1/UserPosts/GetPosts?label=${label}&userId=${userId}`)
      .pipe(map(data => {
        return data;
      }));
  }

  getBirdsByLabel(userId: string, label: string){
    return this.httpClient.get<PostListResponse[]>(`${environment.userPostApiUrl}api/v1/UserPosts/GetBirds?label=${label}&userId=${userId}`)
      .pipe(map(data => {
        return data;
      }));
  }


  getPostsByUser(userId: string){
    return this.httpClient.get<PostListResponse[]>(`${environment.userPostApiUrl}api/v1/UserPosts/GetAll?userId=${userId}`)
      .pipe(map(data => {
        return data;
      }));
  }
}
