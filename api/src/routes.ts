import { Router } from 'express';
import DevelopAnswers from './use-cases/developAnswer';


const routes = Router();

routes.get('/', (req: any, res: any) => {
  return res.json({ message: 'Hello World' });
});


routes.post('/send_avaliation', (req: any, res: any) => {
  console.log("AQUI TAO OS BODY", req.body)
  
  const {data: {organization_id, user_id, message, avaliation, is_admin, is_new_frontend, research_id}} = req.body
  const developAnswer = new DevelopAnswers(organization_id ,user_id)
  developAnswer.createAnswer(message, avaliation, is_admin, is_new_frontend, research_id)
  return res.json({ message: "Avaliação enviada com sucesso!", itens: req.body});
});

routes.post('/no_answer_to_nps', (req: any, res: any) => {
  const {data: {organization_id, user_id, is_admin, is_new_frontend, research_id}} = req.body
  const developAnswer = new DevelopAnswers(organization_id ,user_id)
  developAnswer.noAnswerNps(is_admin, is_new_frontend, research_id)

  return res.json({ message: "Sua resposta foi cancelada com sucesso.", itens: req.body});
});

routes.post('/answer_later', (req: any, res: any) => {
  return res.json({ message: "Você será lembrado mais tarde.", itens: req.body});
});

export default routes;