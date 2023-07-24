import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface PlayerThrowDBData {
  id: string;
  player: string;
  game: string;
  multiplyer: 'single' | 'double' | 'tripple';
  value: string;
}

@Injectable({
  providedIn: 'root',
})
export class PlayerThrowDataService {
  constructor(private _httpClient: HttpClient) {}

  public create(
    data: Omit<PlayerThrowDBData, 'id'>
  ): Observable<PlayerThrowDBData> {
    return this._httpClient.post<PlayerThrowDBData>(`/api/player/`, {
      data,
    });
  }
}
