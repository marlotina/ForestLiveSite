import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PostPendingResponse } from 'src/app/model/post';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PendingService {

  constructor(private httpClient: HttpClient) { 
  }

  GetToConfirm(){
    return this.httpClient.get<PostPendingResponse>(`${environment.pendingApiURl}api/v1/PendingBirds/GetToConfirm/`)
      .pipe(map(data => {
        return data;
      }));
  }

  GetWithiutSpecie(){
    return this.httpClient.get<PostPendingResponse>(`${environment.pendingApiURl}api/v1/PendingBirds/GetWithiutSpecie/`)
      .pipe(map(data => {
        return data;
      }));
  }
}
