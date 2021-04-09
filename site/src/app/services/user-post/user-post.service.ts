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

  GetPosts(userId: string, label: string, type: string){
    let params: string;
    if(label == null){
      params = `?userId=${userId}&type=${type}&label=none`;
    } else {
      params = `?userId=${userId}&type=${type}&label=${label}`;
    }
    return this.httpClient.get<PostListResponse[]>
    (`${environment.userPostApiUrl}api/v1/UserPosts/GetPosts${params}`)
      .pipe(map(data => {
        return data;
      }));
  }
}
