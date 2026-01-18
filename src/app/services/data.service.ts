import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, shareReplay } from 'rxjs';
import { Olympic } from '../models/olympic';
import { Participation } from '../models/participation';

@Injectable({
  providedIn: 'root'
})
export class DataService {
private readonly url = './assets/mock/olympic.json';
private readonly olympicSubject = new BehaviorSubject<Olympic[]>([]);
readonly olympicsObservable = this.olympicSubject.asObservable();

constructor(private http:HttpClient) {
  this.loadOlympics();
}

private loadOlympics(): void {
  this.http.get<Olympic[]>(this.url).subscribe({
    next : data => this.olympicSubject.next(data),
    error : e => console.error(e)
  });
}

getOlympicByCountry(countryName: string): Observable<Olympic>{
  return this.olympicsObservable.pipe(
    map(olympics => {
      const olympic = olympics.find(o => o.country === countryName);
        if (!olympic) {
          throw new Error('Country not found');
        }
      return olympic;
    }),
  )
}

getOlympics(): Observable<Olympic[]>{
  return this.olympicsObservable;
}
//Array.from(new Set(data.map((olympic: Olympic) => olympic.participations.map((f: Participation) => f.year)).flat())).length;
}
