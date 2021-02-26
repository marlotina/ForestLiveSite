import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PostResponse } from 'src/app/model/post';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchBirdsService {

  constructor(private httpClient: HttpClient) { 
  }

  GetBirdBySpecie(specieId : string){
    return this.httpClient.get<PostResponse[]>(`${environment.userPostApiUrl}api/v1/BirdUser/GetPosts/?userId=marlotina`)
      .pipe(map(data => {
        return data;
      }));
    }
}
