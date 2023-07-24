import * as express from 'express';
import {
  GameService,
  PlayerService,
  PlayerThrowService,
  getConnection,
} from './db';
import { setRoutes } from './routes';

export async function bootstrapApi(server: express.Express) {
  const mongodbClient = await getConnection(
    process.env['MONGO_DB_USERNAME'] || '',
    process.env['MONGO_DB_PASSWORD'] || '',
    process.env['MONGO_DB_PORT'] || ''
  );
  const playerService = new PlayerService(mongodbClient);
  const gameService = new GameService(mongodbClient);
  const playerThrowService = new PlayerThrowService(mongodbClient);
  server.set('PlayerService', playerService);
  server.set('GameService', gameService);
  server.set('PlayerThrowService', playerThrowService);

  setRoutes(server);
}
