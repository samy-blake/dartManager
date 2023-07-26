import { z } from 'zod';
import { ObjectId, Db } from 'mongodb';

export const playerThrowEntitySchema = z.object({
  _id: z.instanceof(ObjectId),
  _playerid: z.instanceof(ObjectId),
  _gameid: z.instanceof(ObjectId),
  multiplyer: z.enum(['single', 'double', 'tripple']),
  value: z.number(),
});

export type PlayerThrowEntity = z.infer<typeof playerThrowEntitySchema>;

export const playerThrowDTOSchema = z.object({
  id: z.string(),
  playerid: z.string(),
  gameid: z.string(),
  multiplyer: playerThrowEntitySchema.shape.multiplyer,
  value: playerThrowEntitySchema.shape.value,
});

export type PlayerThrowDTO = z.infer<typeof playerThrowDTOSchema>;

export const PlayerThrowDTO = {
  convertFromEntity(entity: PlayerThrowEntity): PlayerThrowDTO {
    const candidate: PlayerThrowDTO = {
      id: entity._id.toHexString(),
      playerid: entity._playerid.toHexString(),
      gameid: entity._gameid.toHexString(),
      multiplyer: entity.multiplyer,
      value: entity.value,
    };
    return playerThrowDTOSchema.parse(candidate);
  },
};

export class PlayerThrowService {
  private readonly db: Db;

  constructor(mongoDb: Db) {
    this.db = mongoDb;
  }

  private getPlayerThrowsCollection() {
    return this.db.collection<PlayerThrowEntity>('playerThrows');
  }

  async findPlayerThrow(id: string): Promise<PlayerThrowDTO | null> {
    const entity = await this.getPlayerThrowsCollection().findOne({
      _id: new ObjectId(id),
    });
    return entity ? PlayerThrowDTO.convertFromEntity(entity) : null;
  }

  async getAllPlayerThrows(): Promise<PlayerThrowDTO[]> {
    const result = await this.getPlayerThrowsCollection().find();
    return (await result.toArray()).map((entity) =>
      PlayerThrowDTO.convertFromEntity(entity)
    );

    // return entity ? PlayerThrowDTO.convertFromEntity(entity) : null;
  }

  async createPlayerThrow(
    dto: Omit<PlayerThrowDTO, 'id'>
  ): Promise<PlayerThrowDTO> {
    const candidate = playerThrowEntitySchema.parse({
      ...dto,
      _id: new ObjectId(),
      _gameid: new ObjectId(dto.gameid),
      _playerid: new ObjectId(dto.playerid),
    });
    const { insertedId } = await this.getPlayerThrowsCollection().insertOne(
      candidate
    );

    return PlayerThrowDTO.convertFromEntity({
      ...dto,
      _id: insertedId,
      _playerid: new ObjectId(dto.playerid),
      _gameid: new ObjectId(dto.gameid),
    });
  }

  // async updatePlayerThrow(
  //   id: string,
  //   dto: Omit<Partial<PlayerThrowDTO>, 'id'>
  // ): Promise<PlayerThrowDTO | null> {
  //   const candidate = playerThrowEntitySchema.partial().parse(dto);

  //   const { value } = await this.getPlayerThrowsCollection().findOneAndUpdate(
  //     { _id: new ObjectId(id) },
  //     { $set: candidate },
  //     { returnDocument: 'after' }
  //   );
  //   return value ? PlayerThrowDTO.convertFromEntity(value) : null;
  // }

  async deletePlayerThrow(id: string): Promise<void> {
    await this.getPlayerThrowsCollection().deleteOne({
      _id: new ObjectId(id),
    });
  }
}
