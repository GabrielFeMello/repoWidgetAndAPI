import PrismaOrganizationsRepository from '../repositories/organizations'
import PrismaUsersRepository from '../repositories/users'
import prisma from '../database/index'
import { INPSUser } from 'user'
import { INPSOrganization } from 'organization'
import PrismaNpsAnswersRepository from '../repositories/nps_answers'

class DevelopAnswers {
  organizationsRepo: any
  usersRepo: any
  organization_id: number
  user_id: number

  constructor(organization_id: number, user_id: number) {
    const organizationsRepo =  new PrismaOrganizationsRepository()
    const usersRepo = new PrismaUsersRepository()

    this.organization_id = organization_id
    this.user_id = user_id
    
    this.organizationsRepo = organizationsRepo
    this.usersRepo = usersRepo
  }

  async createAnswer(message:string, avaliation: number, is_admin: boolean, is_new_frontend: boolean, research_id: boolean) {
    // prisma.nps_answers.findUnique()

    const organization = await this.organizationsRepo.getOrgById(this.organization_id)
    const user = await this.usersRepo.getUserById(this.user_id)

    const {name: user_name, id: user_id, email: user_email} = user
    const {name: organization_name, id: organization_id} = organization

    const answerRepository = new PrismaNpsAnswersRepository()
    answerRepository.create({
      rate: avaliation,
      comment: message,
      user_id,
      organization_id,
      user_name,
      organization_name,
      user_email,
      user_role: is_admin ? 'admin' : 'tech',
      is_admin,
      is_new_frontend,
      nps_research_id: research_id
    })
    console.log("Will create Its Answer")
  }
  async noAnswerNps(is_admin: boolean, is_new_frontend: boolean, research_id: boolean) {
    // prisma.nps_answers.findUnique()

    const organization = await this.organizationsRepo.getOrgById(this.organization_id)
    const user = await this.usersRepo.getUserById(this.user_id)

    const {name: user_name, id: user_id, email: user_email} = user
    const {name: organization_name, id: organization_id} = organization

    const answerRepository = new PrismaNpsAnswersRepository()
    const didIt = answerRepository.create({
      user_id,
      organization_id,
      user_name,
      organization_name,
      user_email,
      user_role: is_admin ? 'admin' : 'tech',
      is_admin,
      is_new_frontend,
      nps_research_id: research_id,
      no_answer: true
    })
    console.log("Will create Its Answer", didIt)
  }
}



export default DevelopAnswers