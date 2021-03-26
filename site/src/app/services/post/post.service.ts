import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PostRequest, PostResponse, PostListResponse } from 'src/app/model/post';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) { 
  }

  addPost(request: PostRequest) {
    return this.httpClient.post<PostResponse>(`${environment.postApiUrl}api/v1/BirdPost/AddPost/`, request)
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

  getPosts(orderBy: number){
    return this.httpClient.get<PostListResponse[]>(`${environment.postApiUrl}api/v1/BirdPost/GetPosts?orderby=${orderBy}`)
      .pipe(map(data => {
        return data;
      }));
  }

  getAllPosts(orderBy: number){
    return this.httpClient.get<PostListResponse[]>(`${environment.postApiUrl}api/v1/BirdPost/getAllPosts?orderby=${orderBy}`)
      .pipe(map(data => {
        return data;
      }));
  }

  deletePost(postId: string){
    return this.httpClient.delete(`${environment.postApiUrl}api/v1/BirdPost/DeletePost/?postId=${postId}`);
  }
}
