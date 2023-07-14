import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'game-panel',
    loadChildren: () =>
      import('./game-panel/game-panel.module').then((m) => m.GamePanelModule),
  },
  {
    path: '**',
    redirectTo: 'game-panel',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
