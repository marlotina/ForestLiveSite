import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PostRequest, PostResponse, PostUpdateSpecieRequest, PostAssignSpecieRequest, PostAssignSpecieResponse } from 'src/app/model/post';
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

  updateBird(request: PostUpdateSpecieRequest) {
    return this.httpClient.put<PostAssignSpecieResponse>(`${environment.postApiUrl}api/v1/ManagePost/UpdateSpecieId/`, request)
      .pipe(map(data => {
        return data;
      }));
  }
}
