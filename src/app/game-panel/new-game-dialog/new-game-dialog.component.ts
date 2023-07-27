import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipListboxChange } from '@angular/material/chips';
import { MatDialogRef } from '@angular/material/dialog';
import {
  PlayerDBData,
  PlayerDataService,
} from 'src/app/core/player-data.service';

export interface NewGameResult {
  points: number;
  player: PlayerDBData[];
}

@Component({
  selector: 'app-new-game-dialog',
  templateUrl: './new-game-dialog.component.html',
  styleUrls: ['./new-game-dialog.component.scss'],
})
export class NewGameDialogComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    points: new FormControl(301, Validators.required),
    player: new FormControl([], Validators.minLength(2)),
  });
  public playerList: PlayerDBData[] = [];
  public selectedPlayer: PlayerDBData[] = [];

  constructor(
    private _playerData: PlayerDataService,
    private _dialogRef: MatDialogRef<NewGameDialogComponent>
  ) {}

  ngOnInit(): void {
    this._playerData.getAll().subscribe((playerDbList: PlayerDBData[]) => {
      this.playerList = playerDbList;
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this._dialogRef.close(this.form.value);
  }

  updateSelectedPlayer(data: MatChipListboxChange) {
    this.selectedPlayer = data.value;
  }
}
