import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BirdSpeciePostResponse } from 'src/app/model/post';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BirdsService {

  constructor(private httpClient: HttpClient) { 
  }

  GetWithoutSpecie(){
    return this.httpClient.get<BirdSpeciePostResponse[]>(`${environment.birdApiUrl}api/v1/SpeciesSearch/GetPendingBirds/`)
      .pipe(map(data => {
        return data;
      }));
  }
}
