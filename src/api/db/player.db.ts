import { z } from 'zod';
import { ObjectId, Db } from 'mongodb';

export const playerEntitySchema = z.object({
  _id: z.instanceof(ObjectId),
  name: z.string(),
  delete: z.boolean(),
});

export type PlayerEntity = z.infer<typeof playerEntitySchema>;

export const playerDTOSchema = z.object({
  id: z.string(),
  name: playerEntitySchema.shape.name,
  delete: playerEntitySchema.shape.delete,
});

export type PlayerDTO = z.infer<typeof playerDTOSchema>;

export const PlayerDTO = {
  convertFromEntity(entity: PlayerEntity): PlayerDTO {
    const candidate: PlayerDTO = {
      id: entity._id.toHexString(),
      name: entity.name,
      delete: entity.delete,
    };
    return playerDTOSchema.parse(candidate);
  },
};

export class PlayerService {
  private readonly db: Db;

  constructor(mongoDb: Db) {
    this.db = mongoDb;
  }

  private getPlayersCollection() {
    return this.db.collection<PlayerEntity>('players');
  }

  async findPlayer(id: string): Promise<PlayerDTO | null> {
    const entity = await this.getPlayersCollection().findOne({
      _id: new ObjectId(id),
    });
    return entity ? PlayerDTO.convertFromEntity(entity) : null;
  }

  async getAllPlayers(): Promise<PlayerDTO[]> {
    const result = await this.getPlayersCollection().find();
    return (await result.toArray()).map((entity) =>
      PlayerDTO.convertFromEntity(entity)
    );

    // return entity ? PlayerDTO.convertFromEntity(entity) : null;
  }

  async createPlayer(dto: Omit<PlayerDTO, 'id'>): Promise<PlayerDTO> {
    const candidate = playerEntitySchema.parse({
      ...dto,
      _id: new ObjectId(),
    });
    const { insertedId } = await this.getPlayersCollection().insertOne(
      candidate
    );
    return PlayerDTO.convertFromEntity({ ...dto, _id: insertedId });
  }

  async updatePlayer(
    id: string,
    dto: Omit<Partial<PlayerDTO>, 'id'>
  ): Promise<PlayerDTO | null> {
    const candidate = playerEntitySchema.partial().parse(dto);

    const { value } = await this.getPlayersCollection().findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: candidate },
      { returnDocument: 'after' }
    );
    return value ? PlayerDTO.convertFromEntity(value) : null;
  }

  async deletePlayer(id: string): Promise<void> {
    const player = await this.findPlayer(id);

    this.updatePlayer(id, {
      ...player,
      delete: true,
    });
  }
}
