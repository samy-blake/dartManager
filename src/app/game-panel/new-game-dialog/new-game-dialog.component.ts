import { Component, OnInit } from '@angular/core';
import { MatChipListboxChange } from '@angular/material/chips';
import {
  PlayerDBData,
  PlayerDataService,
} from 'src/app/core/player-data.service';

@Component({
  selector: 'app-new-game-dialog',
  templateUrl: './new-game-dialog.component.html',
  styleUrls: ['./new-game-dialog.component.scss'],
})
export class NewGameDialogComponent implements OnInit {
  public playerList: PlayerDBData[] = [];
  public selectedPlayer: PlayerDBData[] = [];

  constructor(private _playerData: PlayerDataService) {}

  ngOnInit(): void {
    this._playerData.getAll().subscribe((playerDbList: PlayerDBData[]) => {
      this.playerList = playerDbList;
    });
  }

  updateSelectedPlayer(data: MatChipListboxChange) {
    this.selectedPlayer = data.value;
  }
}
