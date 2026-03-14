import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common'

import { PrismaService } from '../../prisma/prisma.service'
import { CreateBudgetDto } from './dto/budget.dto'

@Injectable()
export class BudgetService {
  constructor(private readonly prisma: PrismaService) {}

  async createTarget(userId: string, dto: CreateBudgetDto) {
    const { projectId, type, limit } = dto

    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    })

    if (!project) {
      throw new BadRequestException('Project not found')
    }

    if (project.userId !== userId) {
      throw new BadRequestException('Unauthorized project')
    }

    const now = new Date()
    const month = now.getMonth() + 1
    const year = now.getFullYear()

    const existing = await this.prisma.budget.findFirst({
      where: {
        projectId,
        month,
        year,
        type,
      },
    })

    if (existing) {
      throw new BadRequestException('Target already exists for this month')
    }

    return this.prisma.budget.create({
      data: {
        projectId,
        type,
        limit,
        month,
        year,
      },
    })
  }

  // GET ALL TARGETS
  async getTargets(userId: string) {
    return this.prisma.budget.findMany({
      where: {
        project: {
          userId,
        },
      },
      include: {
        project: true,
      },
    })
  }

  // GET ONE TARGET
  async getTarget(userId: string, id: string) {
    const target = await this.prisma.budget.findFirst({
      where: {
        id,
        project: {
          userId,
        },
      },
    })

    if (!target) {
      throw new NotFoundException('Target not found')
    }

    return target
  }

  // UPDATE TARGET
  async updateTarget(userId: string, id: string, limit: number) {
    const target = await this.prisma.budget.findFirst({
      where: {
        id,
        project: {
          userId,
        },
      },
    })

    if (!target) {
      throw new NotFoundException('Target not found')
    }

    return this.prisma.budget.update({
      where: { id },
      data: { limit },
    })
  }

  // DELETE TARGET
  async deleteTarget(userId: string, id: string) {
    const target = await this.prisma.budget.findFirst({
      where: {
        id,
        project: {
          userId,
        },
      },
    })

    if (!target) {
      throw new NotFoundException('Target not found')
    }

    return this.prisma.budget.delete({
      where: { id },
    })
  }
}
