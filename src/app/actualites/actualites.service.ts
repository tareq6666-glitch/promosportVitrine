import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Actualite {
  title: string;
  url: string;
  order: number;
}

@Injectable({ providedIn: 'root' })
export class ActualitesService {
  constructor(private http: HttpClient) {}

  getActualites(): Observable<Actualite[]> {
    return this.http
      .get<Actualite[]>('assets/actualites.json')
      .pipe(map(list => list.sort((a, b) => a.order - b.order)));
  }
}
