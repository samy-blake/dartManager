import { Injectable } from '@angular/core';
import { Player, PlayerData } from '../game-panel/Player';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private _activeGame = 'ACTIVE_GAME';
  private _activePlayerId = 'ACTIVE_PLAYER_ID';

  constructor() {}

  setActivePlayerId(activePlayerId: string) {
    localStorage?.setItem(this._activePlayerId, activePlayerId);
  }
  getActivePlayerId(): string {
    return localStorage?.getItem(this._activePlayerId) || '';
  }

  setActiveGameData(data: Player[]) {
    const jsonData = data.map((v) => v.getJson());
    localStorage?.setItem(this._activeGame, JSON.stringify(jsonData));
  }

  getActiveGameData(): PlayerData[] {
    const stringData = localStorage.getItem(this._activeGame);
    if (!stringData) {
      return [];
    }
    try {
      const data: PlayerData[] = JSON.parse(stringData);
      if (!Array.isArray(data)) {
        throw new Error('no array');
      }
      return data;
    } catch (e) {}
    return [];
  }
}
