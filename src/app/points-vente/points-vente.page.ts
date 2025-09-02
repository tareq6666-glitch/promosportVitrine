import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../core/header/header/header.component';
import { PointsMapComponent } from './points-map/points-map/points-map.component';

@Component({
  selector: 'app-points-vente-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, PointsMapComponent],
  templateUrl: './points-vente.page.html',
})
export class PointsVentePage {}
