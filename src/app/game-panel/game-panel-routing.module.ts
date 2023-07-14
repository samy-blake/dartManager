import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamePanelComponent } from './game-panel.component';

const routes: Routes = [
  {
    path: '',
    component: GamePanelComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamePanelRoutingModule {}
