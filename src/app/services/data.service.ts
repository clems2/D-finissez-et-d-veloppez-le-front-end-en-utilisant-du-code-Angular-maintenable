import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, map, Observable, shareReplay } from 'rxjs';
import { Olympic } from '../models/olympic';
import { Participation } from '../models/participation';
import { LoadingState } from '../state/loading-state';

@Injectable({
  providedIn: 'root'
})
export class DataService {
private readonly url = './assets/mock/olympic.json';
private readonly olympicStateSubject = new BehaviorSubject<LoadingState>(
  { 
    status: 'empty',
    data: [] 
  }
);

readonly stateObservable = this.olympicStateSubject.asObservable();



constructor(private http:HttpClient) {
  this.loadOlympics();
}

public loadOlympics(): void {
  this.olympicStateSubject.next({ status: 'loading', data: [] });
  this.http.get<Olympic[]>(this.url).subscribe({
    next : data => this.olympicStateSubject.next({ status: data.length ? 'loaded': 'empty', data }),
    error : e => this.olympicStateSubject.next({ status: 'error', data: [], error: e.message })
  });
}

getOlympicByCountry(countryName: string): Observable<Olympic>{
  return this.olympicStateSubject.pipe(
    map(state => state.data),
    filter((data): data is Olympic[] => data !== undefined),
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
  return this.olympicStateSubject.pipe(
    map(state => state.data),
    filter((data): data is Olympic[] => data !== undefined)
    );
}

getOlympicById(id: number): Olympic | undefined {
  return this.olympicStateSubject.value.data?.find(olympic => olympic.id === id);
}

//Array.from(new Set(data.map((olympic: Olympic) => olympic.participations.map((f: Participation) => f.year)).flat())).length;
}
