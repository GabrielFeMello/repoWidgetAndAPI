import api from '../api'

export const sendAvaliationToAPI = async (organization_id: number, user_id:number, is_new_frontend: boolean, is_admin: boolean,  message: string, avaliation: number, research_id: number) => {
  return api.post('/send_avaliation', {
    data: {
      organization_id, user_id, is_new_frontend, is_admin, message, avaliation, research_id
    }
  })
}
