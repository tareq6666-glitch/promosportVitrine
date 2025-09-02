import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Actualite {
  title: string;
  url: string;
}

@Injectable({ providedIn: 'root' })
export class ActualitesService {
  constructor(private http: HttpClient) {}

  getActualites(): Observable<Actualite[]> {
    return this.http.get<Actualite[]>('assets/actualites.json');
  }
}
