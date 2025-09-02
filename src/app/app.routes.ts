import { Routes } from '@angular/router';
import { HomePageComponent } from './home/home.page';
import { PointsVentePage } from './points-vente/points-vente.page';

export const routes: Routes = [
  { path: '', component: HomePageComponent, title: 'Promosport' },
  { path: 'points-de-vente', component: PointsVentePage, title: 'Points de vente' },
  { path: '**', redirectTo: '' }
];
