import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { AutocompleteResponse, CountryItem } from 'src/app/model/specie';

@Injectable({
  providedIn: 'root'
})
export class ExternaldataService {

  constructor(private httpClient: HttpClient) { 
  }

  GetSpeciesByName(text: string, languageCode: string){
    return this.httpClient.get<AutocompleteResponse[]>(`${environment.externalDataApiUrl}api/v1/Autocomplete/GetNames?languageCode=${languageCode}&text=${text}`)
      .pipe(map(data => {
        return data;
      }));
  }

  GetSpeciesByScienceName(text: string, languageCode: string){
    return this.httpClient.get<AutocompleteResponse[]>(`${environment.externalDataApiUrl}api/v1/Autocomplete/GetScienceNames?languageCode=${languageCode}&text=${text}`)
      .pipe(map(data => {
        return data;
      }));
  }

  GetCountries(languageCode: string){
    return this.httpClient.get<CountryItem[]>(`${environment.externalDataApiUrl}api/v1/Country/GetCountries?languageCode=${languageCode}`)
      .pipe(map(data => {
        return data;
      }));
  }
}
