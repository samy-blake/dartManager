import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerPanelRoutingModule } from './player-panel-routing.module';
import { PlayerPanelComponent } from './player-panel.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [PlayerPanelComponent],
  imports: [
    CommonModule,
    PlayerPanelRoutingModule,
    MatTableModule,
    MatSortModule,
  ],
})
export class PlayerPanelModule {}
