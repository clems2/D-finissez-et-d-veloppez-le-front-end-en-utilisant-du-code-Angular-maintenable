import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, shareReplay } from 'rxjs';
import { Olympic } from '../models/olympic';

@Injectable({
  providedIn: 'root'
})
export class DataService {
private readonly url = './assets/mock/olympic.json';

  constructor(private http:HttpClient) {}

  getOlympic(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.url).pipe(
      shareReplay(1),
    );
  }
  
  getOlympicByCountry(countryName: string): Observable<Olympic>{
    return this.getOlympic().pipe(
      map(olympics => {
        const olympic = olympics.find(o => o.country === countryName);
          if (!olympic) {
            throw new Error('Country not found');
          }
        return olympic;
      }),
    )
  }


}
