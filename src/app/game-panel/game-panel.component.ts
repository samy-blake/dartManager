import {
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
import { PlayerDBData, PlayerDataService } from '../core/player-data.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerCardsComponent } from './player-cards/player-cards.component';
import { LocalStorageService } from '../core/local-storage.service';
import {
  GameWinData,
  GameWinScreenComponent,
} from '../game-win-screen/game-win-screen.component';

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
export class GamePanelComponent implements OnInit, OnDestroy, AfterViewInit {
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
    private router: Router,
    private _localStorage: LocalStorageService // private _playerDataService: PlayerDataService
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

  ngOnInit(): void {}

  private _addPlayer(pos: number, playerData: PlayerDBData) {
    const player = new Player(playerData.id, pos, playerData.name, 301);
    this._playerList.push(player);
    player.onUpdate.subscribe(this._setUpdateDateOnPlayer.bind(this));
    return player.getJson();
  }

  private _setPlayer(playerData: PlayerData) {
    const player = new Player(
      playerData.id,
      playerData.pos,
      playerData.name,
      playerData.score
    );
    this._playerList.push(player);
    player.onUpdate.subscribe(this._setUpdateDateOnPlayer.bind(this));
    return player.getJson();
  }

  private _restoreGame(playerData: PlayerData[]) {
    const data = [];
    this._playerList = [];
    const activePlayerId = this._localStorage.getActivePlayerId();

    for (let i = 0; i < playerData.length; i++) {
      const player = this._setPlayer(playerData[i]);
      const playerDataObj = {
        ...player,
        active: false,
      };

      if (activePlayerId === player.id || (i === 0 && !activePlayerId)) {
        this.activeId = player.id;
        this.playerCardsComponent.updateView();
        playerDataObj.active = true;
      }
      data.push(playerDataObj);
    }
    this.playerDataSource = new MatTableDataSource(data);
    this.playerDataSource.sort = this.sort;
    this.playerDataList = data;
    this._localStorage.setActiveGameData(this._playerList);
  }

  newGame(playerData: PlayerDBData[]): void {
    const data = [];
    this._playerList = [];

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
    this._localStorage.setActiveGameData(this._playerList);
  }

  // update table data
  _setUpdateDateOnPlayer(value: PlayerData) {
    const activeIndex = this.playerDataSource.data.findIndex(
      (v) => v.id === value.id
    );
    this.playerDataSource.data[activeIndex].score = value.score;
    this._localStorage.setActiveGameData(this._playerList);
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
    this._localStorage.setActivePlayerId(this.activeId);
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
        const data: GameWinData = {
          name: player.getJson().name,
        };
        const dialog = this._dialog.open(GameWinScreenComponent, {
          panelClass: 'game-win-screen-panel',
          maxWidth: '100vw',
          maxHeight: '100vh',
          data,
        });
        dialog.afterClosed().subscribe((data: boolean) => {
          if (data) {
            this.openNewGame();
          }
        });
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

  // TODO: remove
  ngAfterViewInit(): void {
    const player: PlayerData[] = this._localStorage.getActiveGameData();
    if (player.length > 0) {
      setTimeout(() => {
        this._restoreGame(player);
      });
    }
  }
}
