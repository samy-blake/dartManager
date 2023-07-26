import { Router } from 'express';
import { GameService } from '../db';
import { body } from 'express-validator';

export const gameRoute = Router();

gameRoute.get('/', async (req, res) => {
  const gameService: GameService = req.app.get('GameService');
  const result = await gameService.getAllGames();
  res.json(result);
});

gameRoute.get('/:id', async (req, res) => {
  const gameService: GameService = req.app.get('GameService');
  const result = await gameService.findGame(req.params.id);
  res.json(result);
});

gameRoute.put(
  '/:id',
  body('winner').notEmpty().optional().escape(),
  body('delete').isBoolean().optional().escape(),
  async (req, res) => {
    const id = req.params ? req.params['id'] : 'none';
    if (id === 'none') {
      throw new Error('no id given');
    }
    const gameService: GameService = req.app.get('GameService');

    const result = await gameService.updateGame(id, {
      date: new Date(),
      delete: req.body.delete || false,
      winnerid: req.body.winner || 'none',
    });
    res.json(result);
  }
);

gameRoute.post('/', async (req, res) => {
  const gameService: GameService = req.app.get('GameService');

  const result = await gameService.createGame({
    date: new Date(),
    delete: req.body.delete || false,
    winnerid: 'none',
  });
  res.json(result);
});
