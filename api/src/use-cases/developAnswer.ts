import PrismaOrganizationsRepository from '../repositories/organizations'
import PrismaUsersRepository from '../repositories/users'
import prisma from '../database/index'
import { INPSUser } from 'user'
import { INPSOrganization } from 'organization'
import PrismaNpsAnswersRepository from '../repositories/nps_answers'

class DevelopAnswers {
  organizationsRepo: any
  usersRepo: any
  organization: INPSOrganization
  user: INPSUser

  constructor(organization_id: number, user_id: number) {
    const organizationsRepo =  new PrismaOrganizationsRepository()
    const usersRepo = new PrismaUsersRepository()
    
    this.organizationsRepo = organizationsRepo
    this.usersRepo = usersRepo

    this.organization = this.organizationsRepo.getOrgById(organization_id)
    this.user = this.usersRepo.getUserById(user_id)
  }

  async createAnswer(message:string, avaliation: number, is_admin: boolean, is_new_frontend: boolean, research_id: boolean) {
    // prisma.nps_answers.findUnique()
    const {name: user_name, id: user_id, email: user_email} = this.user
    const {name: organization_name, id: organization_id} = this.organization

    const answerRepository = new PrismaNpsAnswersRepository()
    answerRepository.create({
      rate: avaliation,
      comment: message,
      user_id,
      organization_id,
      user_name,
      organization_name,
      user_email,
      is_admin: is_admin,
      is_new_frontend,
      nps_research_id: research_id
    })
    console.log("Will create Its Answer")
  }
}

export default DevelopAnswers