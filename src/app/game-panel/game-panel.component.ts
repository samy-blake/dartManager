// Animation:
// https://stackblitz.com/edit/mat-table-animation?file=app%2Fanimations%2Ftemplate.animations.ts

import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Player, PlayerData } from './Player';
import { MatDialog } from '@angular/material/dialog';
import { NewGameDialogComponent } from './new-game-dialog/new-game-dialog.component';
import { PlayerDBData } from '../core/player-data.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerCardsComponent } from './player-cards/player-cards.component';

interface PlayerDataTable extends PlayerData {
  active: boolean;
}
export interface Points {
  value: number;
  multiplication: number;
}
@Component({
  selector: 'app-game-panel',
  templateUrl: './game-panel.component.html',
  styleUrls: ['./game-panel.component.scss'],
})
export class GamePanelComponent implements OnDestroy, AfterViewInit {
  private _playerList: Player[] = [];
  private _routeQueryParams$: Subscription | undefined;

  public pointsNumbers = Array(21)
    .fill(0)
    .map((v: any, i: number) => i);

  public playerDataSourceColumns = ['pos', 'name', 'score'];
  public playerDataSource!: MatTableDataSource<PlayerDataTable>;
  public playerDataList: PlayerDataTable[] = [];
  public multiplication = 1;
  public points: Points[] = [];
  public activeId: string = '';

  @ViewChild(PlayerCardsComponent)
  playerCardsComponent!: PlayerCardsComponent;

  @ViewChild('playerTable') playerTable!: ElementRef<any>;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private _changeDetectorRefs: ChangeDetectorRef,
    private _dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this._routeQueryParams$ = route.queryParams.subscribe((params) => {
      if (params['newGame']) {
        this.openNewGame();
        router.navigate([], {
          queryParams: {
            newGame: null,
          },
          queryParamsHandling: 'merge',
        });
      }
    });
  }

  private _addPlayer(pos: number, playerData: PlayerDBData) {
    const player = new Player(playerData.id, pos, playerData.name, 301);
    this._playerList.push(player);

    player.onUpdate.subscribe(this._setUpdateDateOnPlayer.bind(this));
    return player.getJson();
  }

  newGame(playerData: PlayerDBData[]): void {
    const data = [];

    for (let i = 0; i < playerData.length; i++) {
      const player = this._addPlayer(i, playerData[i]);

      data.push({
        ...player,
        active: i === 0,
      });
      if (i === 0) {
        this.activeId = player.id;
        this.playerCardsComponent.updateView();
      }
    }
    this.playerDataSource = new MatTableDataSource(data);
    this.playerDataSource.sort = this.sort;
    this.playerDataList = data;
  }

  // update table data
  _setUpdateDateOnPlayer(value: PlayerData) {
    const activeIndex = this.playerDataSource.data.findIndex(
      (v) => v.id === value.id
    );
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
    this.activeId = this.playerDataSource.data[nextIndex].id;
    this.playerCardsComponent.updateView();
    this.updateTableView();
  }

  setMultiplication(multiplication: number) {
    if (multiplication === this.multiplication) {
      this.multiplication = 1;
    } else {
      this.multiplication = multiplication;
    }
  }

  setPoint(value: number) {
    if (this.points.length > 3) {
      return;
    }
    this.points.push({
      value,
      multiplication: this.multiplication,
    });
    this.playerCardsComponent.updatePointSum();
    this.multiplication = 1;
    this.playerWinCheck();
  }

  public playerWinCheck() {
    for (const player of this._playerList) {
      if (player.getScore() - this.playerCardsComponent.pointSum === 0) {
        alert('winning ' + player.getJson().name);
        break;
      }
    }
  }

  public setPointsToActivePlayer(): void {
    let pointsSum = 0;
    for (const point of this.points) {
      pointsSum += point.value * point.multiplication;
    }
    this.setPointToPlayer(pointsSum);
    this.points = [];
  }

  setPointToPlayer(value: number) {
    const activeIndex = this.playerDataSource.data.findIndex((v) => v.active);
    const activePlayerIndex = this._playerList.findIndex(
      (v) => v.ID === this.playerDataSource.data[activeIndex].id
    );

    if (this._playerList[activePlayerIndex].getScore() - value >= 0) {
      this._playerList[activePlayerIndex].updateScore(value);
      this._changeDetectorRefs.detectChanges();
    }
    this._setNextActivePlayer();
  }

  removePoint(index: number): void {
    this.points.splice(index, 1);
    this.playerCardsComponent.updatePointSum();
  }

  removeLastPoint(): void {
    this.removePoint(this.points.length - 1);
  }

  openNewGame(): void {
    const dialogRef = this._dialog.open(NewGameDialogComponent);
    dialogRef.afterClosed().subscribe((player: PlayerDBData[]) => {
      if (Array.isArray(player)) {
        this.newGame(player);
      }
    });
  }

  updateTableView() {
    setTimeout(() => {
      const activeEl = this.playerTable.nativeElement.querySelector('.active');
      console.log(activeEl.offsetTop);
      if (activeEl) {
        const halfHeight = activeEl.getBoundingClientRect().height / 2;
        this.playerTable.nativeElement.scrollTo({
          behavior: 'smooth',
          top:
            activeEl.offsetTop +
            halfHeight -
            this.playerTable.nativeElement.getBoundingClientRect().height / 2,
        });
      }
    });
  }

  ngOnDestroy() {
    this._routeQueryParams$?.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.playerTable.nativeElement.addEventListener('scroll', () => {
      console.log('scroll');
    });

    setTimeout(
      () =>
        this.newGame([
          {
            id: 'as',
            name: 'Sören',
          },
          {
            id: 'asasd',
            name: 'Sören',
          },
          {
            id: 'agfgfs',
            name: 'Sören',
          },
          {
            id: 'aadsass',
            name: 'Sören',
          },
          {
            id: 'qweqw',
            name: 'Sören',
          },
          {
            id: 'hdgdg',
            name: 'Sören',
          },
          {
            id: 'werew',
            name: 'Sören',
          },
          {
            id: 'vcyvcy',
            name: 'Sören',
          },
        ]),
      1000
    );
  }
}
