import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { VoteRequest, VoteResponse } from 'src/app/model/vote';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private httpClient: HttpClient) { }

  AddVote(request: VoteRequest) {
    return this.httpClient.post<VoteResponse>(`${environment.voteApiUrl}api/v1/VotePost/AddVote/`, request)
      .pipe(map(data => {
        return data;
      }));
  }
}
