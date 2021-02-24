import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { AutocompleteResponse } from 'src/app/model/specie';


@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {

  constructor(private httpClient: HttpClient) { 
  }

  GetSpeciesByKeys(text: string){
    return this.httpClient.get<AutocompleteResponse[]>(`${environment.birdApiUrl}api/v1/Autocmplete/GetNames?languageId=c7bc511d-562b-4a59-a434-2d754fe40f5c&text=${text}`)
      .pipe(map(data => {
        return data;
      }));
  }
}
