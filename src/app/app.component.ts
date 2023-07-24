import { Component, OnInit } from '@angular/core';
import { PlayerDataService } from './core/player-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {} // private test: PlayerDataService

  // ngOnInit(): void {
  //   setTimeout(() => {
  //     this.test.getAll().subscribe((res) => console.log(res));
  //   }, 3000);
  // }
}
