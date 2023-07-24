import { TestBed } from '@angular/core/testing';

import { PlayerThrowDataService } from './player-throw-data.service';

describe('PlayerThrowDataService', () => {
  let service: PlayerThrowDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerThrowDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
