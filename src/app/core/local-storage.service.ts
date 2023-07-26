import { Injectable } from '@angular/core';
import { Player, PlayerData } from '../game-panel/Player';
import { GameDBData } from './game-data.service';

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

  setActiveGameData(game: GameDBData, player: Player[]) {
    const jsonData = {
      game,
      player: player.map((v) => v.getJson()),
    };
    localStorage?.setItem(this._activeGame, JSON.stringify(jsonData));
  }

  getActiveGameData(): { player: PlayerData[]; game: GameDBData } | undefined {
    const stringData = localStorage.getItem(this._activeGame);
    if (!stringData) {
      return undefined;
    }
    try {
      const data: { player: PlayerData[]; game: GameDBData } =
        JSON.parse(stringData);
      if (!data.player || !Array.isArray(data.player)) {
        throw new Error('no array');
      }
      return data;
    } catch (e) {}
    return undefined;
  }
}
