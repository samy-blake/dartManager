import * as express from 'express';
import { playerRoute } from './player.route';
import { gameRoute } from './game.route';
import { playerThrowRoute } from './player-throw.route';

export function setRoutes(server: express.Express): void {
  server.use(express.json());
  server.use('/api/player', playerRoute);
  server.use('/api/game', gameRoute);
  server.use('/api/player-throw', playerThrowRoute);
}
