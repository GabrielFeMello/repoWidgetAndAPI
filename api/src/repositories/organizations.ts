import prisma from '../database/index'
interface IOrgMainProps {
  id: number
  name: string
}
class PrismaOrganizationsRepository {
  async getOrgById(id: number) {
    const organization = await prisma.organizations.findUnique({where:{id: id}})
    return organization as IOrgMainProps
  }
}

export default PrismaOrganizationsRepository