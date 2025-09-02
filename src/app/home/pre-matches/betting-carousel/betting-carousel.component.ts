import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

type BetType =
  | 'Match Result'
  | 'Double Chance'
  | 'Total Goals'
  | 'Both Teams To Score'
  | '1st Half Total Goals'
  | 'Draw No Bet'
  | 'Goals Asian Handicap'
  | '2nd Half Total Goals';

interface MatchItem {
  id: string;
  date: string;
  time: string;
  league: string;
  home: string;
  away: string;
  odds: { home: number; draw: number; away: number };
}

@Component({
  selector: 'app-betting-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './betting-carousel.component.html',
  styleUrls: ['./betting-carousel.component.scss'],
})
export class BettingCarouselComponent {
  betTypes: BetType[] = [
    'Match Result',
    'Double Chance',
    'Total Goals',
    'Both Teams To Score',
    '1st Half Total Goals',
    'Draw No Bet',
    'Goals Asian Handicap',
    '2nd Half Total Goals',
  ];
  active: BetType = 'Match Result';

  matches: MatchItem[] = [
    { id: 'm1', date: '16/08', time: '18:30', league: 'Spain - La Liga', home: 'Mallorca', away: 'Barcelona', odds: { home: 5.10, draw: 4.20, away: 1.57 } },
    { id: 'm2', date: '18/08', time: '20:00', league: 'Spain - La Liga', home: 'Real Madrid', away: 'Osasuna', odds: { home: 1.24, draw: 6.00, away: 10.00 } },
    { id: 'm3', date: '07/08', time: '18:30', league: 'Europe - UEFA Europa League - Qualifying', home: 'PAOK FC', away: 'RZ Pellets WAC', odds: { home: 1.46, draw: 4.20, away: 5.80 } },
    { id: 'm4', date: '19/08', time: '21:00', league: 'Italy - Serie A', home: 'Inter', away: 'Lazio', odds: { home: 1.90, draw: 3.40, away: 4.20 } },
    { id: 'm5', date: '20/08', time: '19:00', league: 'England - Premier League', home: 'Arsenal', away: 'Everton', odds: { home: 1.55, draw: 4.30, away: 6.20 } },
    { id: 'm6', date: '21/08', time: '18:00', league: 'France - Ligue 1', home: 'PSG', away: 'Nice', odds: { home: 1.35, draw: 5.10, away: 8.50 } },
  ];

  @ViewChild('scroller', { static: true }) scroller!: ElementRef<HTMLDivElement>;

  // drag state
  private dragging = false;
  private startX = 0;
  private startScrollLeft = 0;

  setActive(tab: BetType) { this.active = tab; }

  // pointer events (fonctionne souris + tactile)
  onPointerDown(ev: PointerEvent) {
    this.dragging = true;
    const el = this.scroller.nativeElement;
    this.startX = ev.clientX;
    this.startScrollLeft = el.scrollLeft;
    el.classList.add('dragging');
    el.setPointerCapture(ev.pointerId);
  }
  onPointerMove(ev: PointerEvent) {
    if (!this.dragging) return;
    const el = this.scroller.nativeElement;
    const dx = this.startX - ev.clientX;
    el.scrollLeft = this.startScrollLeft + dx;
  }
  onPointerUp(ev: PointerEvent) {
    if (!this.dragging) return;
    this.dragging = false;
    const el = this.scroller.nativeElement;
    el.classList.remove('dragging');
    try { el.releasePointerCapture(ev.pointerId); } catch {}
  }
}
