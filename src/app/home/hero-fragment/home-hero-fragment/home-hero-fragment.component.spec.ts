import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHeroFragmentComponent } from './home-hero-fragment.component';

describe('HomeHeroFragmentComponent', () => {
  let component: HomeHeroFragmentComponent;
  let fixture: ComponentFixture<HomeHeroFragmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeHeroFragmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeHeroFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
