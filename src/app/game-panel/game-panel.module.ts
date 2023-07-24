import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';

import { GamePanelRoutingModule } from './game-panel-routing.module';
import { GamePanelComponent } from './game-panel.component';
import { MatSortModule } from '@angular/material/sort';
import { NewGameDialogComponent } from './new-game-dialog/new-game-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [GamePanelComponent, NewGameDialogComponent],
  imports: [
    CommonModule,
    GamePanelRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class GamePanelModule {}
