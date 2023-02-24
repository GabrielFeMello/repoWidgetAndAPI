import { Router } from 'express';
import DevelopAnswers from './use-cases/developAnswer';


const routes = Router();

routes.get('/', (req: any, res: any) => {
  return res.json({ message: 'Hello World' });
});


routes.post('/send_avaliation', (req: any, res: any) => {
  const {organization_id, user_id, message, avaliation, is_admin, is_new_frontend, research_id} = req.body
  const developAnswer = new DevelopAnswers(organization_id ,user_id)
  developAnswer.createAnswer(message, avaliation, is_admin, is_new_frontend, research_id)
  return res.json({ message: "Avaliação enviada com sucesso!", itens: req.body});
});

export default routes;