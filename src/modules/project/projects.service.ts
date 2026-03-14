import { Injectable } from '@nestjs/common'

import { PrismaService } from '../../prisma/prisma.service'
import { generateApiKey } from '../../common/utils/generate.util'

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, name: string) {
    const project = await this.prisma.project.create({
      data: {
        name,
        userId,
      },
    })

    const apiKey = generateApiKey()

    await this.prisma.projectApiKey.create({
      data: {
        key: apiKey,
        projectId: project.id,
      },
    })

    return {
      project,
      apiKey,
    }
  }

  async findAll(userId: string) {
    return this.prisma.project.findMany({
      where: { userId },
      include: { apiKeys: true },
    })
  }

  async findOne(id: string) {
    return this.prisma.project.findUnique({
      where: { id },
      include: { apiKeys: true },
    })
  }

  async update(id: string, name: string) {
    return this.prisma.project.update({
      where: { id },
      data: { name },
    })
  }

  async remove(id: string) {
    return this.prisma.project.delete({
      where: { id },
    })
  }
}
