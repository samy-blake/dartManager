import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface GameDBData {
  id: string;
  date: string;
  winner: string; // Todo: set to player data
}

@Injectable({
  providedIn: 'root',
})
export class GameDataService {
  constructor(private _httpClient: HttpClient) {}

  public getAll(): Observable<GameDBData[]> {
    return this._httpClient.get<GameDBData[]>('/api/game/');
  }

  public get(id: string): Observable<GameDBData[]> {
    return this._httpClient.get<GameDBData[]>(`/api/player/${id}`);
  }

  public update(
    id: string,
    data: Omit<GameDBData, 'id'>
  ): Observable<GameDBData> {
    return this._httpClient.put<GameDBData>(`/api/player/${id}`, {
      data,
    });
  }

  public create(): Observable<GameDBData> {
    return this._httpClient.post<GameDBData>(`/api/player/`, {
      data: {},
    });
  }
}
