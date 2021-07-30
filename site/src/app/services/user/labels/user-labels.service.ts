import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserLabelPageResponse, UserLabelRequest, UserLabelResponse } from 'src/app/model/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserLabelsService {

  constructor(private httpClient: HttpClient) { }

  GetUserLabels(userId: string){
    return this.httpClient.get<UserLabelPageResponse[]>(`${environment.usersApiUrl}api/v1/UserLabels/GetLabels?userId=${userId}`)
      .pipe(map(data => {
        return data;
      }));
  }

  GetLabelsAutocomplete(userId: string){
    return this.httpClient.get<string[]>(`${environment.usersApiUrl}api/v1/UserLabels/GetLabelsAutocomplete?userId=${userId}`)
      .pipe(map(data => {
        return data;
      }));
  }

  GetUserLabelsDetails(userId: string){
    return this.httpClient.get<UserLabelResponse[]>(`${environment.usersApiUrl}api/v1/UserLabels/GetLabelsDetails?userId=${userId}`)
      .pipe(map(data => {
        return data;
      }));
  }

  AddLabel(userLabel: UserLabelRequest){
    return this.httpClient.post<UserLabelResponse>(`${environment.usersApiUrl}api/v1/UserLabels/AddLabel/`, userLabel)
      .pipe(map(data => {
        return data;
      }));
  }

  DeleteLabel(label: string, userId: string){
    return this.httpClient.delete<boolean>(`${environment.usersApiUrl}api/v1/UserLabels/DeleteLabel/?&label=${label}&userId=${userId}`)
      .pipe(map(data => {
        return data;
      }));
  }
}
