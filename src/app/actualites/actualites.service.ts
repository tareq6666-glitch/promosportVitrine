import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Actualite {
  title_ar: string;
  date_text: string;
  category: string;
  summary_ar: string;
  url: string;
  source: string;
}

@Injectable({ providedIn: 'root' })
export class ActualitesService {
  constructor(private http: HttpClient) {}

  getActualites(): Observable<Actualite[]> {
    return this.http.get<Actualite[]>('assets/actualites.json');
  }
}
