import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameWinScreenComponent } from './game-win-screen/game-win-screen.component';
import { HeaderComponent } from './header/header.component';
import { MatDialogModule } from '@angular/material/dialog';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [AppComponent, HeaderComponent, GameWinScreenComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
