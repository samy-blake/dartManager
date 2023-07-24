import { Component, Input } from '@angular/core';
import { PlayerDBData } from 'src/app/core/player-data.service';
import { Points } from '../game-panel.component';
import { PlayerData } from '../Player';

@Component({
  selector: 'app-player-cards',
  templateUrl: './player-cards.component.html',
  styleUrls: ['./player-cards.component.scss'],
})
export class PlayerCardsComponent {
  public playerList: PlayerData[] = [];

  @Input() activeId: string = '';

  public pointSum: number = 0;
  points: Points[] = [];

  @Input('points')
  set _points(value: Points[]) {
    if (value.length > 0) {
      // this.pointSum = value
      //   .map((v) => v.multiplication * v.value)
      //   .reduce((v) => v);
    } else {
      this.pointSum = 0;
    }
    this.points = value;
    console.log(this.pointSum);
  }

  @Input('playerList')
  set _playerList(value: PlayerData[]) {
    this.playerList = value;
  }
}
