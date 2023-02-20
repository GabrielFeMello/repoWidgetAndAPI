import api from '../api'

export const sendAvaliationToAPI = async (organization_id: number, user_id:number, client_id?:number) => {
  return api.post('/send_avaliation', {
    data: {
      organization_id, client_id, user_id
    }
  })
}
