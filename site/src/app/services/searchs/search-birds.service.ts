import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { MapPoint } from 'src/app/model/Map';
import { BirdSpeciePostResponse, PostResponse, ModalPostResponse } from 'src/app/model/post';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchBirdsService {

  constructor(private httpClient: HttpClient) { 
  }

  GetBirdBySpecie(specieId : string){
    return this.httpClient.get<PostResponse[]>(`${environment.birdApiUrl}api/v1/SpeciesSearch/GetBirds/?birdSpecieId=${specieId}`)
      .pipe(map(data => {
        return data;
      }));
  }

  GetSearchPoints(latiude : string, longitude: string, zoom: number){
    return this.httpClient.get<MapPoint[]>(`${environment.birdApiUrl}api/v1/SearchMap/GetPoints/?latitude=${latiude}&longitude=${longitude}&zoom=${zoom}`)
      .pipe(map(data => {
        return data;
      }));
  }

  GetModalBirdPost(postId : string, specieId: string){
    return this.httpClient.get<ModalPostResponse[]>(`${environment.birdApiUrl}api/v1/SearchMap/GetModalInfo/?postId=${postId}&specieId=${specieId}`)
      .pipe(map(data => {
        return data;
      }));
  }
  
  GetWithoutSpecie(){
    return this.httpClient.get<BirdSpeciePostResponse[]>(`${environment.birdApiUrl}api/v1/SpeciesSearch/GetPendingBirds/`)
      .pipe(map(data => {
        return data;
      }));
  }
}
