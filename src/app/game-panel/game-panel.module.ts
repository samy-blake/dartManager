import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';

import { GamePanelRoutingModule } from './game-panel-routing.module';
import { GamePanelComponent } from './game-panel.component';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [GamePanelComponent],
  imports: [
    CommonModule,
    GamePanelRoutingModule,
    MatTableModule,
    MatSortModule,
    MatChipsModule,
  ],
})
export class GamePanelModule {}
