import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PlayerDBData, PlayerDataService } from '../core/player-data.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ManagePlayerComponent } from './manage-player/manage-player.component';

interface PlayerDataTable extends PlayerDBData {
  winning?: number;
}

@Component({
  selector: 'app-player-panel',
  templateUrl: './player-panel.component.html',
  styleUrls: ['./player-panel.component.scss'],
})
export class PlayerPanelComponent implements AfterViewInit {
  private _getAllPlayersRequest: Subscription | undefined;

  // public playerDataSourceColumns = ['name', 'winning', 'options'];
  public playerDataSourceColumns = ['name', 'options'];
  public playerDataSource!: MatTableDataSource<PlayerDataTable>;

  public playerDataList: PlayerDBData[] = [];

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private _playerData: PlayerDataService,
    private _dialog: MatDialog
  ) {}

  private _getPlayers() {
    this._getAllPlayersRequest?.unsubscribe();

    this._getAllPlayersRequest = this._playerData
      .getAll()
      .subscribe((response: PlayerDBData[]) => {
        this.playerDataList = response.filter((v) => v.delete !== true);
        this.playerDataSource = new MatTableDataSource(this.playerDataList);
        this.playerDataSource.sort = this.sort;
      });
  }

  ngAfterViewInit() {
    this._getPlayers();
  }

  openManagePlayer(player?: PlayerDBData) {
    const dialogRef = this._dialog.open(ManagePlayerComponent, {
      data: player,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._getPlayers();
      }
    });
  }
}
