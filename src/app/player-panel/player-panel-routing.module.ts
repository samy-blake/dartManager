import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerPanelComponent } from './player-panel.component';

const routes: Routes = [
  {
    path: '',
    component: PlayerPanelComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerPanelRoutingModule {}
