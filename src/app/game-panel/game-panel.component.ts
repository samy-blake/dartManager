// Animation:
// https://stackblitz.com/edit/mat-table-animation?file=app%2Fanimations%2Ftemplate.animations.ts

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Player, PlayerData } from './Player';

interface PlayerDataTable extends PlayerData {
  active: boolean;
}
@Component({
  selector: 'app-game-panel',
  templateUrl: './game-panel.component.html',
  styleUrls: ['./game-panel.component.scss'],
})
export class GamePanelComponent implements OnInit, AfterViewInit {
  public pointsNumbers = Array(21)
    .fill(0)
    .map((v: any, i: number) => i);

  public playerDataSourceColumns = ['pos', 'name', 'score'];
  public playerDataSource!: MatTableDataSource<PlayerDataTable>;
  private _playerList: Player[] = [];
  public multiplication = 1;
  public points: number[] = [];

  get pointsSum() {
    return this.points.reduce((a, b) => {
      return a + b;
    }, 0);
  }

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private changeDetectorRefs: ChangeDetectorRef) {}

  private _addPlayer(i: number) {
    const player = new Player(i.toString(), i, 'Sören', 301);
    this._playerList.push(player);

    player.onUpdate.subscribe(this._setUpdateDateOnPlayer.bind(this));
    return player.getJson();
  }

  ngOnInit(): void {
    const data = [];
    for (let i = 0; i < 6; i++) {
      const player = this._addPlayer(i);

      data.push({
        ...player,
        active: i === 0,
      });
    }

    this.playerDataSource = new MatTableDataSource(data);
  }

  // update table data
  _setUpdateDateOnPlayer(value: PlayerData) {
    const activeIndex = this.playerDataSource.data.findIndex(
      (v) => v.id === value.id
    );
    console.log(activeIndex);
    this.playerDataSource.data[activeIndex].score = value.score;
  }

  // set next active player
  _setNextActivePlayer(): void {
    const activeIndex = this.playerDataSource.data.findIndex((v) => v.active);
    const nextIndex =
      activeIndex + 1 >= this.playerDataSource.data.length
        ? 0
        : activeIndex + 1;
    this.playerDataSource.data[activeIndex].active = false;
    this.playerDataSource.data[nextIndex].active = true;
  }

  setMultiplication(multiplication: number) {
    if (multiplication === this.multiplication) {
      this.multiplication = 1;
    } else {
      this.multiplication = multiplication;
    }
  }

  setPoint(value: number) {
    if (this.multiplication > 1) {
      value *= this.multiplication;
      this.multiplication = 1;
    }
    this.points.push(value);
    if (this.points.length === 3) {
      this.setPointToPlayer(this.pointsSum);
      this.points = [];
    }
  }

  setPointToPlayer(value: number) {
    const activeIndex = this.playerDataSource.data.findIndex((v) => v.active);
    const activePlayerIndex = this._playerList.findIndex(
      (v) => v.ID === this.playerDataSource.data[activeIndex].id
    );

    if (this._playerList[activePlayerIndex].getScore() - value >= 0) {
      this._playerList[activePlayerIndex].updateScore(value);
      this.changeDetectorRefs.detectChanges();
    }
    this._setNextActivePlayer();
  }

  removePoint(index: number): void {
    this.points.splice(index, 1);
  }

  ngAfterViewInit() {
    this.playerDataSource.sort = this.sort;
  }
}
