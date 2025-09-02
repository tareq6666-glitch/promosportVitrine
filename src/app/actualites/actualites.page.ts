import { Component, OnInit } from '@angular/core';
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
export class ActualitesPageComponent implements OnInit {
  actualites$!: Observable<Actualite[]>;
  expandedId: number | null = null;

  constructor(private actualitesService: ActualitesService) {}

  ngOnInit(): void {
    this.actualites$ = this.actualitesService.getActualites();
  }

  toggle(id: number) {
    this.expandedId = this.expandedId === id ? null : id;
  }
}
