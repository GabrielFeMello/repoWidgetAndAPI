import prisma from '../database/index'

class PrismaNpsAnswersRepository {
  async create(props: any) {
    var newDate = new Date()
    prisma.nps_answers.create({
      data: {
        ...props,
        created_at: newDate,
        updated_at: newDate
      }
    })
  }
  
}

export default PrismaNpsAnswersRepository