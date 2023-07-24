import { MongoClient, Db } from 'mongodb';

export async function getConnection(
  username: string,
  password: string,
  port: string
): Promise<Db> {
  const mongoClient = new MongoClient(
    `mongodb://${username}:${password}@127.0.0.1:${port}`
  );
  // const mongoClient = new MongoClient(`mongodb://127.0.0.1:${port}/dart`);

  await mongoClient.connect();
  console.log('db connected');
  return mongoClient.db('dart');
}
