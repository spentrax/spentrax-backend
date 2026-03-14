import { Injectable } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { BadRequestException } from '@nestjs/common'

import { PrismaService } from '../../prisma/prisma.service'
import { hashPassword, verifyPassword } from '../../common/utils/generate.util'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(email: string, password: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) throw new BadRequestException('User already exists')

    const hashed = await hashPassword(password)

    return this.prisma.user.create({
      data: { email, password: hashed },
    })
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (!user) throw new Error('Invalid email or password')

    const isValid = await verifyPassword(password, user.password)
    if (!isValid) throw new Error('Invalid email or password')

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    })

    return { user, token }
  }
}
