import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { MapSpeciePoint } from 'src/app/model/Map';
import { PostResponse, ModalPostResponse, PostListResponse, PostRequest, PostHomeResponse } from 'src/app/model/post';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BirdserviceService {

  constructor(private httpClient: HttpClient) { 
  }

  GetLastbirds(){
    return this.httpClient.get<PostHomeResponse[]>(`${environment.birdApiUrl}api/v1/SpeciesSearch/GetLastbirds`)
      .pipe(map(data => {
        return data;
      }));
  }

  GetBirdBySpecie(specieId : string, orderBy: number){
    let languageCode = localStorage.getItem('locale');
    return this.httpClient.get<PostListResponse[]>(`${environment.birdApiUrl}api/v1/SpeciesSearch/GetBirds?specieId=${specieId}&orderby=${orderBy}&languageCode=${languageCode}`)
      .pipe(map(data => {
        return data;
      }));
  }

  GetBirdBySpecieName(specieName : string, orderBy: number){
    let languageCode = localStorage.getItem('locale');
    return this.httpClient.get<PostListResponse[]>(`${environment.birdApiUrl}api/v1/SpeciesSearch/GetBirdsByName?specieName=${specieName}&orderby=${orderBy}&languageCode=${languageCode}`)
      .pipe(map(data => {
        return data;
      }));
  }

  addPost(request: PostRequest) {
    return this.httpClient.post<PostResponse>(`${environment.birdApiUrl}api/v1/ManagePostSpecie/AddPost/`, request)
      .pipe(map(data => {
        return data;
      }));
  }

  deletePost(postId: string, specieId: string) {
    return this.httpClient.delete<boolean>(`${environment.birdApiUrl}api/v1/ManagePostSpecie/DeletePost?postId=${postId}&specieId=${specieId}`)
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

  GetModalBirdPost(postId : string){
    let languageCode = localStorage.getItem('locale');
    return this.httpClient.get<ModalPostResponse>(`${environment.birdApiUrl}api/v1/post/GetModalInfo/?postId=${postId}&languageCode=${languageCode}`)
      .pipe(map(data => {
        return data;
      }));
  }
  
  GetPost(postId : string, specieId: string){
    let languageCode = localStorage.getItem('locale');
    return this.httpClient.get<PostResponse>(`${environment.birdApiUrl}api/v1/SpeciesSearch/GetPost?postId=${postId}&specieId=${specieId}&languageCode=${languageCode}`)
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
