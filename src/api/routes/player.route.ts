import { Router } from 'express';
import { PlayerService } from '../db';
import { body, param } from 'express-validator';

export const playerRoute = Router();

playerRoute.get('/', async (req, res) => {
  const playerService: PlayerService = req.app.get('PlayerService');
  const result = await playerService.getAllPlayers();
  res.json(result);
});

playerRoute.get('/:id', async (req, res) => {
  const playerService: PlayerService = req.app.get('PlayerService');
  const result = await playerService.findPlayer(req.params.id);
  res.json(result);
});

playerRoute.put(
  '/:id',
  body('name').notEmpty().escape(),
  body('delete').optional().escape(),
  async (req, res) => {
    const id = req.params ? req.params['id'] : 'none';
    if (id === 'none') {
      throw new Error('no id given');
    }
    const playerService: PlayerService = req.app.get('PlayerService');

    const result = await playerService.updatePlayer(id, {
      name: req.body.name,
      delete: req.body.delete || false,
    });
    res.json(result);
  }
);

playerRoute.post(
  '/',
  body('name').notEmpty().escape(),
  body('delete').optional().escape(),
  async (req, res) => {
    const playerService: PlayerService = req.app.get('PlayerService');

    const result = await playerService.createPlayer({
      name: req.body.name,
      delete: req.body.delete || false,
    });
    res.json(result);
  }
);
