import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerPanelComponent } from './player-panel.component';

describe('PlayerPanelComponent', () => {
  let component: PlayerPanelComponent;
  let fixture: ComponentFixture<PlayerPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerPanelComponent]
    });
    fixture = TestBed.createComponent(PlayerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
