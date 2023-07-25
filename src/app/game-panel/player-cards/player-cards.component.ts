import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Points } from '../game-panel.component';
import { PlayerData } from '../Player';

@Component({
  selector: 'app-player-cards',
  templateUrl: './player-cards.component.html',
  styleUrls: ['./player-cards.component.scss'],
})
export class PlayerCardsComponent {
  public pointSum: number = 0;
  public points: Points[] = [];

  @Input() playerList: PlayerData[] = [];
  @Input() activeId: string = '';

  @Input('points')
  set _points(value: Points[]) {
    this.points = value;
    this.updatePointSum();
  }

  @ViewChild('playCards') playCards!: ElementRef<any>;

  public updatePointSum() {
    if (this.points.length > 0) {
      this.pointSum = this.points
        .map((v) => v.multiplication * v.value)
        .reduce((v, v2) => v + v2);
    } else {
      this.pointSum = 0;
    }
  }

  public updateView() {
    setTimeout(() => {
      const activeEl =
        this.playCards.nativeElement.querySelector('.card.active');
      const parent = this.playCards.nativeElement.querySelector('.card-list');
      if (activeEl && parent) {
        const halfWidth = activeEl.getBoundingClientRect().width / 2;
        parent.scrollTo({
          behavior: 'smooth',
          left:
            activeEl.offsetLeft +
            halfWidth -
            parent.getBoundingClientRect().width / 2,
        });
      }
    });
  }
}
