import api from '../api'

export const sendAvaliationToAPI = async (organization_id: number, user_id:number, is_admin: boolean, is_new_frontend: boolean,  message: string, avaliation: number, research_id: number) => {
  return api.post('/send_avaliation', {
    data: {
      organization_id, user_id, is_new_frontend, is_admin, message, avaliation, research_id
    }
  })
}

export const noAnswerToNps = async (organization_id: number, user_id:number, is_admin: boolean, is_new_frontend: boolean, research_id: number) =>{
  return api.post('/no_answer_to_nps', {
    data: {organization_id, user_id, is_new_frontend, is_admin, research_id}
  })
}

export const answerNpsLater = async (organization_id: number, user_id:number, is_admin: boolean, is_new_frontend: boolean, research_id: number) =>{
  return api.post('/answer_later', {
    data: {organization_id, user_id, is_new_frontend, is_admin, research_id}
  })
}