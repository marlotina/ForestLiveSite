import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { MapSpeciePoint } from 'src/app/model/Map';
import { PostResponse, ModalPostResponse, PostListResponse } from 'src/app/model/post';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchBirdsService {

  constructor(private httpClient: HttpClient) { 
  }

  GetBirdBySpecie(specieId : string, orderBy: number){
    return this.httpClient.get<PostListResponse[]>(`${environment.birdApiUrl}api/v1/SpeciesSearch/GetBirds/?birdSpecieId=${specieId}&orderby=${orderBy}`)
      .pipe(map(data => {
        return data;
      }));
  }

  GetSearchPoints(latiude : number, longitude: number, zoom: number, specieId: string){
    return this.httpClient.get<MapSpeciePoint[]>(`${environment.birdApiUrl}api/v1/SearchMap/GetPoints/?latitude=${latiude}&longitude=${longitude}&zoom=${zoom}&specieId=${specieId}`)
      .pipe(map(data => {
        return data;
      }));
  }  

  GetModalBirdPost(postId : string, specieId: string){
    return this.httpClient.get<ModalPostResponse>(`${environment.birdApiUrl}api/v1/SearchMap/GetModalInfo/?postId=${postId}&specieId=${specieId}`)
      .pipe(map(data => {
        return data;
      }));
  }
  
  GetWithoutSpecie(orderBy: number){
    return this.httpClient.get<PostListResponse[]>(`${environment.birdApiUrl}api/v1/SpeciesSearch/GetPendingBirds?orderby=${orderBy}`)
      .pipe(map(data => {
        return data;
      }));
  }
}
