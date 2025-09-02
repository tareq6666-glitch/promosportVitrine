import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type AboutTab = 'Cadre juridique' | 'Notre mission' | 'Réglementation';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-section.component.html',
  styleUrls: ['./about-section.component.scss'],
})
export class AboutSectionComponent {
  tabs: AboutTab[] = ['Cadre juridique', 'Notre mission', 'Réglementation'];
  active: AboutTab = 'Cadre juridique';

  setActive(t: AboutTab) { this.active = t; }
}
