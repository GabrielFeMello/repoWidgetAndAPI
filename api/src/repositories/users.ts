import prisma from '../database/index'

class PrismaUsersRepository {
  async getUserById(id: number) {
    const user = await prisma.users.findUnique({where:{id: id}})

    return user
  }
}

export default PrismaUsersRepository