import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerPanelRoutingModule } from './player-panel-routing.module';
import { PlayerPanelComponent } from './player-panel.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ManagePlayerComponent } from './manage-player/manage-player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [PlayerPanelComponent, ManagePlayerComponent],
  imports: [
    CommonModule,
    PlayerPanelRoutingModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
})
export class PlayerPanelModule {}
