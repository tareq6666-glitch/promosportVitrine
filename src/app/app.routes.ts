import { Routes } from '@angular/router';
import { HomePageComponent } from './home/home.page';

export const routes: Routes = [
  { path: '', component: HomePageComponent, title: 'Promosport' },
  { path: '**', redirectTo: '' }
];
