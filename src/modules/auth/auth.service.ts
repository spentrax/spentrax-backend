import * as jwt from 'jsonwebtoken'
import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { PrismaService } from '../../prisma/prisma.service'
import { hashPassword, verifyPassword } from '../../common/utils/generate.util'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async signup(email: string, password: string, name: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) throw new BadRequestException('User already exists')

    const hashed = await hashPassword(password)

    await this.prisma.user.create({
      data: { email, password: hashed, name },
    })

    return { success: true }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (!user) throw new Error('Invalid email or password')

    const isValid = await verifyPassword(password, user.password)
    if (!isValid) throw new Error('Invalid email or password')

    const secret = this.configService.get<string>('jwtAccessSecret')
    if (!secret) throw new Error('JWT_SECRET is not configured')

    const token = jwt.sign({ userId: user.id }, secret, {
      expiresIn: this.configService.get<string>('jwtAccessDuration') || '15m',
    } as jwt.SignOptions)

    return { token }
  }
}
