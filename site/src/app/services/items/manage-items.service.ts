import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PostRequest, PostResponse, PostListResponse, PostUpdateSpecieRequest, PostUpdateSpecieResponse } from 'src/app/model/post';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManageItemsService {

  constructor(private httpClient: HttpClient) { 
  }

  addPost(request: PostRequest) {
    return this.httpClient.post<PostResponse>(`${environment.postApiUrl}api/v1/ManagePost/AddPost/`, request)
      .pipe(map(data => {
        return data;
      }));
  }

  deletePost(postId: string){
    return this.httpClient.delete(`${environment.postApiUrl}api/v1/ManagePost/DeletePost/?postId=${postId}`);
  }

  addBird(request: PostRequest) {
    return this.httpClient.post<PostResponse>(`${environment.birdApiUrl}api/v1/ManagePostSpecie/AddPost/`, request)
      .pipe(map(data => {
        return data;
      }));
  }

  assignBird(request: PostUpdateSpecieRequest) {
    return this.httpClient.put<PostUpdateSpecieResponse>(`${environment.birdPendingApiUrl}api/v1/ManagePostPending/AssignSpecieId/`, request)
      .pipe(map(data => {
        return data;
      }));
  }

  changeBird(request: PostUpdateSpecieRequest) {
    return this.httpClient.put<PostUpdateSpecieResponse>(`${environment.birdApiUrl}api/v1/ManagePostSpecie/ChangeSpecieId/`, request)
      .pipe(map(data => {
        return data;
      }));
  }

  deleteBird(postId: string, specieId: string) {
    return this.httpClient.delete<boolean>(`${environment.birdApiUrl}api/v1/ManagePostSpecie/DeletePost?postId=${postId}&specieId=${specieId}`)
      .pipe(map(data => {
        return data;
      }));
  }

  addPending(request: PostRequest) {
    return this.httpClient.post<PostResponse>(`${environment.birdPendingApiUrl}api/v1/ManagePostPending/AddPost/`, request)
      .pipe(map(data => {
        return data;
      }));
  }
  

  deletePending(postId: string) {
    return this.httpClient.delete<boolean>(`${environment.birdPendingApiUrl}api/v1/ManagePostPending/DeletePost?postId=${postId}`)
      .pipe(map(data => {
        return data;
      }));
  }
}
