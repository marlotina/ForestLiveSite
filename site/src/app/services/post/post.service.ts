import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DeletePost, PostRequest, PostResponse } from 'src/app/model/post';
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

  GetPost(itemId: string){
    return this.httpClient.get<PostResponse>(`${environment.postApiUrl}api/v1/Item/GetItem/?itemId=${itemId}`)
      .pipe(map(data => {
        return data;
      }));
  }

  GetCommentsByUser(userId: string){
    return this.httpClient.get<PostResponse[]>(`${environment.postApiUrl}api/v1/User/GetPosts/?userId=${userId}`)
      .pipe(map(data => {
        return data;
      }));
  }

  DeletePost(itemId: string){
    return this.httpClient.delete(`${environment.postApiUrl}api/v1/Item/DeleteItem/?itemId=${itemId}`);
  }
}
