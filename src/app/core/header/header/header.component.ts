import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { ActualitesService, Actualite } from '../../../actualites/actualites.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  actualites$!: Observable<Actualite[]>;

  constructor(private actualitesService: ActualitesService) {}

  ngOnInit(): void {
    this.actualites$ = this.actualitesService.getActualites();
  }
}
