import { Router } from 'express';

const routes = Router();

routes.get('/', (req: any, res: any) => {
  return res.json({ message: 'Hello World' });
});

export default routes;