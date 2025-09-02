import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Actualite {
  id: number;
  title_ar: string;
  category: string;
  date_text: string;
  date_iso: string;
  url: string;
  summary_ar: string;
  source: string;
  order: number;
}

@Injectable({ providedIn: 'root' })
export class ActualitesService {
  constructor(private http: HttpClient) {}

  getActualites(): Observable<Actualite[]> {
    return this.http.get<Actualite[]>('assets/actualites.json');
  }
}
