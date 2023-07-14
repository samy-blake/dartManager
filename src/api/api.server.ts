import * as express from 'express';

export function bootstrapApi(server: express.Express) {
  server.get('/api/**', (req, res) => {});
}
