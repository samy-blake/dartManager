import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCardsComponent } from './player-cards.component';

describe('PlayerCardsComponent', () => {
  let component: PlayerCardsComponent;
  let fixture: ComponentFixture<PlayerCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerCardsComponent]
    });
    fixture = TestBed.createComponent(PlayerCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
