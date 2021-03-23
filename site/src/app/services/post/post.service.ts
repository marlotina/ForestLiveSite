import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ModalPostResponse, PostRequest, PostResponse } from 'src/app/model/post';
import { map } from 'rxjs/operators';
import { MapPoint } from 'src/app/model/Map';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) { 
  }

  AddPost(request: PostRequest) {
    return this.httpClient.post<PostResponse>(`${environment.postApiUrl}api/v1/BirdPost/AddPost/`, request)
      .pipe(map(data => {
        return data;
      }));
  }

  GetPost(postId: string){
    return this.httpClient.get<PostResponse>(`${environment.postApiUrl}api/v1/BirdPost/GetPost/?postId=${postId}`)
      .pipe(map(data => {
        return data;
      }));
  }

  DeletePost(postId: string){
    return this.httpClient.delete(`${environment.postApiUrl}api/v1/BirdPost/DeletePost/?postId=${postId}`);
  }
}
