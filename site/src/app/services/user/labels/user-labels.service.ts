import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserLabelResponse } from 'src/app/model/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserLabelsService {

  constructor(private httpClient: HttpClient) { }

  GetUserLabels(userId: string){
    return this.httpClient.get<string[]>(`${environment.userPostApiUrl}api/v1/BirdLabels/GetUserLabels/?&userId=${userId}`)
      .pipe(map(data => {
        return data;
      }));
  }

  GetUserLabelsDetails(userId: string){
    return this.httpClient.get<UserLabelResponse[]>(`${environment.userPostApiUrl}api/v1/BirdLabels/GetUserLabelsDetails/?&userId=${userId}`)
      .pipe(map(data => {
        return data;
      }));
  }

  AddLabel(userId: string){
    return this.httpClient.get<UserLabelResponse>(`${environment.userPostApiUrl}api/v1/BirdLabels/GetUserLabels/?&userId=${userId}`)
      .pipe(map(data => {
        return data;
      }));
  }

  DeleteLabel(label: string, userId: string){
    return this.httpClient.get<boolean>(`${environment.userPostApiUrl}api/v1/BirdLabels/DeleteUserLabel/?&label=${label}&=userId=${userId}`)
      .pipe(map(data => {
        return data;
      }));
  }
}
