import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CommentRequest, CommentResponse } from 'src/app/model/Comment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }  

  AddComment(request: CommentRequest){
    return this.httpClient.post(`${environment.postApiUrl}api/v1/Comment/AddComment/`, request);
  }

  GetCommentsByPost(itemId: string){
    return this.httpClient.get<CommentResponse[]>(`${environment.postApiUrl}api/v1/Comment/GetComment/?itemId=${itemId}`)
      .pipe(map(data => {
        return data;
      }));
  }

}
