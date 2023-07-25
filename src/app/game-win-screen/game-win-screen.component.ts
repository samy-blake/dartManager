import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

export interface GameWinData {
  name: string;
}

interface Letter {
  letter: string;
  delay: number;
}

@Component({
  selector: 'app-game-win-screen',
  templateUrl: './game-win-screen.component.html',
  styleUrls: ['./game-win-screen.component.scss'],
})
export class GameWinScreenComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/winning-animation.json',
  };

  public nameStringArray: Letter[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: GameWinData) {}

  ngOnInit(): void {
    if (this.data.name) {
      this.nameStringArray = this.data.name.split('').map((v, i, arr) => {
        return {
          letter: v,
          delay: Number.parseInt(((i / arr.length) * 100).toString()),
        };
      });
    }
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
}
