import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { AutocompleteResponse, CountryItem } from 'src/app/model/specie';


@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {

  constructor(private httpClient: HttpClient) { 
  }

  GetSpeciesByKeys(text: string, languageCode: string){
    return this.httpClient.get<AutocompleteResponse[]>(`${environment.specieApiUrl}api/v1/Autocomplete/GetNames?languageCode=${languageCode}&text=${text}`)
      .pipe(map(data => {
        return data;
      }));
  }

  GetCountries(languageCode: string){
    return this.httpClient.get<CountryItem[]>(`${environment.specieApiUrl}api/v1/Country/GetCountries?languageCode=${languageCode}`)
      .pipe(map(data => {
        return data;
      }));
  }
}
