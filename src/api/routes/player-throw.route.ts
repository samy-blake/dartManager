import { Router } from 'express';
import { PlayerThrowService } from '../db';
import { body } from 'express-validator';

export const playerThrowRoute = Router();

playerThrowRoute.post(
  '/',
  body('player').notEmpty().escape(),
  body('game').notEmpty().escape(),
  body('multiplyer').notEmpty().escape(),
  body('value').notEmpty().escape(),
  async (req, res) => {
    const playerThrowService: PlayerThrowService =
      req.app.get('PlayerThrowService');

    const result = await playerThrowService.createPlayerThrow({
      gameid: req.body.game,
      playerid: req.body.player,
      multiplyer: req.body.multiplyer,
      value: Number.parseInt(req.body.value),
    });
    res.json(result);
  }
);
