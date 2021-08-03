import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { MapPoint } from 'src/app/model/Map';
import { ModalPostResponse, PostListResponse, PostHomeResponse } from 'src/app/model/post';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BirdserviceService {

  constructor(private httpClient: HttpClient) { 
  }

  GetLastbirds(){
    return this.httpClient.get<PostHomeResponse[]>(`${environment.searchsApiUrl}api/v1/SpeciesSearch/GetLastbirds`)
      .pipe(map(data => {
        return data;
      }));
  }

  GetBirdBySpecie(specieId : string, orderBy: number){
    let languageCode = localStorage.getItem('locale');
    return this.httpClient.get<PostListResponse[]>(`${environment.searchsApiUrl}api/v1/SpeciesSearch/GetBirds?specieId=${specieId}&orderby=${orderBy}&languageCode=${languageCode}`)
      .pipe(map(data => {
        return data;
      }));
  }

  GetBirdBySpecieName(specieName : string, orderBy: number){
    let languageCode = localStorage.getItem('locale');
    return this.httpClient.get<PostListResponse[]>(`${environment.searchsApiUrl}api/v1/SpeciesSearch/GetBirdsByName?specieName=${specieName}&orderby=${orderBy}&languageCode=${languageCode}`)
      .pipe(map(data => {
        return data;
      }));
  }


  GetSearchPoints(latiude : number, longitude: number, zoom: number, specieId: string){
    return this.httpClient.get<MapPoint[]>(`${environment.searchsApiUrl}api/v1/SearchMap/GetPoints/?latitude=${latiude}&longitude=${longitude}&zoom=${zoom}&specieId=${specieId}`)
      .pipe(map(data => {
        return data;
      }));
  }  

  GetModalBirdPost(postId : string, authorId: string){
    let languageCode = localStorage.getItem('locale');
    return this.httpClient.get<ModalPostResponse>(`${environment.searchsApiUrl}api/v1/userposts/GetModalInfo/?postId=${postId}&languageCode=${languageCode}&userId=${authorId}`)
      .pipe(map(data => {
        return data;
      }));
  }
}
