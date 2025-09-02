import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BettingCarouselComponent } from './pre-matches/betting-carousel/betting-carousel.component';

// chemins corrigés selon ton arborescence
import { HeaderComponent } from '../core/header/header/header.component';
import { HomeHeroFragmentComponent } from './hero-fragment/home-hero-fragment/home-hero-fragment.component';
import { AboutSectionComponent } from './about/about-section/about-section.component';
import { FooterComponent } from '../core/footer/footer/footer.component';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, HomeHeroFragmentComponent, BettingCarouselComponent,AboutSectionComponent, FooterComponent],
  templateUrl: './home.page.html',
})
export class HomePageComponent {}
