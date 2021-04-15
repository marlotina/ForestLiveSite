import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CommentVoteResponse, VoteRequest, VoteResponse } from 'src/app/model/vote';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private httpClient: HttpClient) { }

  AddVote(request: VoteRequest) {
    return this.httpClient.post<VoteResponse>(`${environment.postInteractionsApi}api/v1/VotePost/AddVote/`, request)
      .pipe(map(data => {
        return data;
      }));
  }

  DeleteVote(voteId: string, postId: string){
    return this.httpClient.delete(`${environment.postInteractionsApi}api/v1/VotePost/DeleteVote?voteId=${voteId}&postId=${postId}`)
      .pipe(map(data => {
        return data;
      }));
  }

  GetVotesByUser(userId: string){
    return this.httpClient.get<VoteResponse[]>(`${environment.userInteractionsApi}api/v1/VoteUser/GetVoteByUser/?userId=${userId}`)
      .pipe(map(data => {
        return data;
      }));
  }

  GetCommentVotesByUser(userId: string){
    return this.httpClient.get<CommentVoteResponse[]>(`${environment.userInteractionsApi}api/v1/CommentVoteUser/GetCommentVoteByUser?userId=${userId}`)
      .pipe(map(data => {
        return data;
      }));
  }
}
