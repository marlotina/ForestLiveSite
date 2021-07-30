import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ModalPostResponse, PostListResponse, PostResponse } from 'src/app/model/post';
import { map } from 'rxjs/operators';
import { MapPoint } from 'src/app/model/Map';

@Injectable({
  providedIn: 'root'
})
export class GetpostService {

  constructor(private httpClient: HttpClient) { 
  }

  getModalBirdPost(postId : string, authorId: string){
    let languageCode = localStorage.getItem('locale');
    return this.httpClient.get<ModalPostResponse>(`${environment.searchsApiUrl}api/v1/userposts/GetModalInfo/?postId=${postId}&languageCode=${languageCode}&userId=${authorId}`)
      .pipe(map(data => {
        return data;
      }));
  }

  getMapPointsPostByUser(userId: string){
    return this.httpClient.get<MapPoint[]>(`${environment.searchsApiUrl}api/v1/UserPosts/GetMapPoints/?userId=${userId}`)
      .pipe(map(data => {
        return data;
      }));
  }

  GetPosts(userId: string, label: string, type: string){
    let languageCode = localStorage.getItem('locale');
    let params: string;
    if(label == null){
      params = `?userId=${userId}&type=${type}&label=none&languageCode=${languageCode}`;
    } else {
      params = `?userId=${userId}&type=${type}&label=${label}&languageCode=${languageCode}`;
    }
    return this.httpClient.get<PostListResponse[]>
    (`${environment.searchsApiUrl}api/v1/UserPosts/GetUserPosts${params}`)
      .pipe(map(data => {
        return data;
      }));
  }

  getPost(postId: string, authorId:string){
    return this.httpClient.get<PostResponse>(`${environment.searchsApiUrl}api/v1/UserPosts/GetPost/?postId=${postId}&userId=${authorId}`)
      .pipe(map(data => {
        return data;
      }));
  }

  GetWithoutSpecie(orderBy: number){
    return this.httpClient.get<PostListResponse[]>(`${environment.searchsApiUrl}api/v1/SpeciesSearch/GetPendings?orderby=${orderBy}`)
      .pipe(map(data => {
        return data;
      }));
  }

  getPosts(orderBy: number){
    return this.httpClient.get<PostListResponse[]>(`${environment.searchsApiUrl}api/v1/Post/GetPosts?orderby=${orderBy}`)
      .pipe(map(data => {
        return data;
      }));
  }
}
