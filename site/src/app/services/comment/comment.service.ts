import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CommentRequest, CommentResponse, PostDataResponse } from 'src/app/model/Comment';
import { CommentVoteRequest, CommentVoteResponse } from 'src/app/model/vote';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }  

  AddComment(request: CommentRequest){
    return this.httpClient.post<CommentResponse>(`${environment.postInteractionsApi}api/v1/CommentPost/AddComment/`, request)
      .pipe(map(data => {
        return data;
      }));
  }

  GetCommentsByPost(postId: string){
    return this.httpClient.get<PostDataResponse>(`${environment.postInteractionsApi}api/v1/CommentPost/GetCommentsByPost?postId=${postId}`)
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
    return this.httpClient.delete(`${environment.postInteractionsApi}api/v1/CommentPost/DeleteComment?postId=${postId}&commentId=${userId}`);
  }

  AddVote(request: CommentVoteRequest) {
    return this.httpClient.post<CommentVoteResponse>(`${environment.postInteractionsApi}api/v1/VoteComment/AddVoteComment/`, request)
      .pipe(map(data => {
        return data;
      }));
  }

  DeleteVote(voteId: string, postId: string){
    return this.httpClient.delete(`${environment.postInteractionsApi}api/v1/VoteComment/DeleteVoteComment?voteCommentId=${voteId}&postId=${postId}`)
      .pipe(map(data => {
        return data;
      }));
  }

}
