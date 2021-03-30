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
    return this.httpClient.post<CommentResponse>(`${environment.postInteractionsApi}api/v1/Comment/AddComment/`, request)
      .pipe(map(data => {
        return data;
      }));
  }

  GetCommentsByPost(postId: string){
    return this.httpClient.get<CommentResponse[]>(`${environment.postInteractionsApi}api/v1/Comment/GetCommentsByPost?postId=${postId}`)
      .pipe(map(data => {
        return data;
      }));
  }

  GetCommentsByUser(userId: string){
    return this.httpClient.get<CommentResponse[]>(`${environment.userInteractionsApi}api/v1/Comment/GetCommentsByUser?userId=${userId}`)
      .pipe(map(data => {
        return data;
      }));
  }

  DeleteComment(postId: string, userId: string){
    return this.httpClient.delete(`${environment.postInteractionsApi}api/v1/Comment/DeleteComment?postId=${postId}&commentId=${userId}`);
  }

}
