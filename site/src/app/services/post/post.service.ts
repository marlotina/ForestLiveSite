import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CommentRequest, CommentResponse, PostRequest, PostResponse } from 'src/app/model/post';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) { 
  }

  AddPost(request: PostRequest) {
    return this.httpClient.post(`${environment.postApiUrl}api/v1/Item/AddItem/`, request);
  }

  GetPost(id: string){
    return this.httpClient.get<PostResponse>(`${environment.postApiUrl}api/v1/Item/GetItem/?id=${id}`)
      .pipe(map(data => {
        return data;
      }));
  }

  AddComment(request: CommentRequest){
    return this.httpClient.post(`${environment.postApiUrl}api/v1/Item/AddItem/`, request);
  }

  GetCommentsByPost(id: string){
    return this.httpClient.get<CommentResponse[]>(`${environment.postApiUrl}api/v1/Item/GetItem/?id=${id}`)
      .pipe(map(data => {
        return data;
      }));
  }
}
