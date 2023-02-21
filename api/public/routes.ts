import { Router } from 'express';

const routes = Router();

routes.get('/', (req: any, res: any) => {
  return res.json({ message: 'Hello World' });
});


routes.post('/send_avaliation', (req: any, res: any) => {
  console.log("AQUI TA A REQUISIÇÃO", req.body)
  return res.json({ message: "Você conseguiu enviar a mensagem!", itens: req.body});
});

export default routes;