import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PostListResponse, PostResponse } from 'src/app/model/post';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetItemsService {

  constructor(private httpClient: HttpClient) { 
  }

  getPost(postId: string){
    return this.httpClient.get<PostResponse>(`${environment.birdApiUrl}api/v1/Post/GetPost/?postId=${postId}`)
      .pipe(map(data => {
        return data;
      }));
  }

  GetWithoutSpecie(orderBy: number){
    return this.httpClient.get<PostListResponse[]>(`${environment.birdApiUrl}api/v1/SpeciesSearch/GetPendings?orderby=${orderBy}`)
      .pipe(map(data => {
        return data;
      }));
  }

  getPosts(orderBy: number){
    return this.httpClient.get<PostListResponse[]>(`${environment.postApiUrl}api/v1/Post/GetPosts?orderby=${orderBy}`)
      .pipe(map(data => {
        return data;
      }));
  }
}
