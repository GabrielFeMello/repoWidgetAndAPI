import prisma from '../database/index'

class PrismaNpsResearchesRepository {
  async currentActive(id: number) {
    prisma.nps_researches.findUnique({where:{id: id}})
  }
}

export default PrismaNpsResearchesRepository