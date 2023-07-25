import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameWinScreenComponent } from './game-win-screen.component';

describe('GameWinScreenComponent', () => {
  let component: GameWinScreenComponent;
  let fixture: ComponentFixture<GameWinScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameWinScreenComponent]
    });
    fixture = TestBed.createComponent(GameWinScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
