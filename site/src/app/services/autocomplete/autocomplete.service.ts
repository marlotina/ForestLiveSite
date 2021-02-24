import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { AutocompleteResponse } from 'src/app/model/specie';


@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {

  constructor(private httpClient: HttpClient) { 
  }

  GetSpeciesByKeys(text: string, languageCode: string){
    return this.httpClient.get<AutocompleteResponse[]>(`${environment.birdApiUrl}api/v1/Autocmplete/GetNames?languageCode=${languageCode}&text=${text}`)
      .pipe(map(data => {
        return data;
      }));
  }
}
