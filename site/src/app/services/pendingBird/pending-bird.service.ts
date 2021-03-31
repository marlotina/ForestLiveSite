import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PostResponse, PostListResponse, PostRequest } from 'src/app/model/post';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PendingBirdService {

  constructor(private httpClient: HttpClient) { 
  }

  addPost(request: PostRequest) {
    return this.httpClient.post<PostResponse>(`${environment.birdPendingApiUrl}api/v1/ManagePostPending/AddPost/`, request)
      .pipe(map(data => {
        return data;
      }));
  }
  

  deletePost(postId: string) {
    return this.httpClient.delete<boolean>(`${environment.birdPendingApiUrl}api/v1/ManagePostPending/DeletePost?postId=${postId}`)
      .pipe(map(data => {
        return data;
      }));
  }

  GetPost(postId : string){
    return this.httpClient.get<PostResponse>(`${environment.birdPendingApiUrl}api/v1/PendingSearch/GetPost?postId=${postId}`)
      .pipe(map(data => {
        return data;
      }));
  }
  
  GetWithoutSpecie(orderBy: number){
    return this.httpClient.get<PostListResponse[]>(`${environment.birdPendingApiUrl}api/v1/PendingSearch/GetPendings?orderby=${orderBy}`)
      .pipe(map(data => {
        return data;
      }));
  }
}
