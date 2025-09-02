import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BettingCarouselComponent } from './betting-carousel.component';

describe('BettingCarouselComponent', () => {
  let component: BettingCarouselComponent;
  let fixture: ComponentFixture<BettingCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BettingCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BettingCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
