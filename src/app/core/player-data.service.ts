import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface PlayerDBData {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class PlayerDataService {
  constructor(private _httpClient: HttpClient) {}

  public getAll(): Observable<PlayerDBData[]> {
    return this._httpClient.get<PlayerDBData[]>('/api/player/');
  }

  public get(id: string): Observable<PlayerDBData[]> {
    return this._httpClient.get<PlayerDBData[]>(`/api/player/${id}`);
  }

  public update(
    id: string,
    data: Omit<PlayerDBData, 'id'>
  ): Observable<PlayerDBData> {
    return this._httpClient.put<PlayerDBData>(`/api/player/${id}`, {
      data,
    });
  }

  public create(data: Omit<PlayerDBData, 'id'>): Observable<PlayerDBData> {
    return this._httpClient.post<PlayerDBData>(`/api/player/`, {
      data,
    });
  }
}
