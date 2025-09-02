import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../core/header/header/header.component';
import { FooterComponent } from '../core/footer/footer/footer.component';
import { ActualitesService, Actualite } from './actualites.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-actualites-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './actualites.page.html',
  styleUrls: ['./actualites.page.scss'],
})
export class ActualitesPageComponent {
  actualites$: Observable<Actualite[]> = this.actualitesService.getActualites();

  constructor(private actualitesService: ActualitesService) {}
}
