import { z } from 'zod';
import { ObjectId, Db } from 'mongodb';

export const gameEntitySchema = z.object({
  _id: z.instanceof(ObjectId),
  _winnerid: z.instanceof(ObjectId),
  date: z.date(),
  delete: z.boolean(),
});

export type GameEntity = z.infer<typeof gameEntitySchema>;

export const gameDTOSchema = z.object({
  id: z.string(),
  winnerid: z.string(),
  date: gameEntitySchema.shape.date,
  delete: gameEntitySchema.shape.delete,
});

export type GameDTO = z.infer<typeof gameDTOSchema>;

export const GameDTO = {
  convertFromEntity(entity: GameEntity): GameDTO {
    const candidate: GameDTO = {
      id: entity._id.toHexString(),
      winnerid: entity._winnerid.toHexString(),
      date: entity.date,
      delete: entity.delete,
    };
    return gameDTOSchema.parse(candidate);
  },
};

export class GameService {
  private readonly db: Db;

  constructor(mongoDb: Db) {
    this.db = mongoDb;
  }

  private getGamesCollection() {
    return this.db.collection<GameEntity>('games');
  }

  async findGame(id: string): Promise<GameDTO | null> {
    const entity = await this.getGamesCollection().findOne({
      _id: new ObjectId(id),
    });
    return entity ? GameDTO.convertFromEntity(entity) : null;
  }

  async getAllGames(): Promise<GameDTO[]> {
    const result = await this.getGamesCollection().find();
    return (await result.toArray()).map((entity) =>
      GameDTO.convertFromEntity(entity)
    );

    // return entity ? GameDTO.convertFromEntity(entity) : null;
  }

  async createGame(dto: Omit<GameDTO, 'id'>): Promise<GameDTO> {
    const candidate = gameEntitySchema.parse({
      ...dto,
      _id: new ObjectId(),
      _winnerid: new ObjectId(),
    });
    const { insertedId } = await this.getGamesCollection().insertOne(candidate);
    return GameDTO.convertFromEntity({
      ...dto,
      _id: insertedId,
      _winnerid: new ObjectId(),
    });
  }

  async updateGame(
    id: string,
    dto: Omit<Partial<GameDTO>, 'id'>
  ): Promise<GameDTO | null> {
    const candidate = gameEntitySchema.partial().parse({
      ...dto,
      _winnerid: new ObjectId(dto.winnerid),
    });

    const { value } = await this.getGamesCollection().findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: candidate },
      { returnDocument: 'after' }
    );
    return value ? GameDTO.convertFromEntity(value) : null;
  }

  async deleteGame(id: string): Promise<void> {
    const player = await this.findGame(id);
    this.updateGame(id, {
      ...player,
      delete: true,
    });
    // await this.getGamesCollection().deleteOne({ _id: new ObjectId(id) });
  }

  async getWinningFromPlayer(playerid: string): Promise<any> {
    const dbResult = await this.getGamesCollection().aggregate([
      {
        $match: {
          _winnerid: new ObjectId(playerid),
        },
      },
      {
        $group: {
          _id: '$_winnerid',
        },
      },
    ]);
  }
}
