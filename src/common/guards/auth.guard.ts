import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

const apiKeyRoutes = [
  { route: '/api/v1/auth/login', method: 'POST' },
  { route: '/api/v1/auth/signup', method: 'POST' },
]

const publicRoutes = [
  { route: '/api/v1/health', method: 'GET' },
  { route: '/api/v1/usage/batch', method: 'POST' },

]

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const path = request.url.split('?')[0] // remove query params
    const method = request.method

    console.log('path', path)
    console.log('method', method)
    // Public route
    if (publicRoutes.some(r => r.route === path && r.method === method)) {
      return true
    }

    // API key route
    const apiKeyRoute = apiKeyRoutes.find(r => r.route === path && r.method === method)
    if (apiKeyRoute) {
      const apiKey = request.headers['x-api-key'] || request.headers['api_key']
      if (!apiKey || apiKey !== this.configService.get<string>('apiKey')) {
        throw new UnauthorizedException('Invalid API key')
      }
      return true
    }

    // JWT verification
    const authHeader = request.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Unauthorized')
    }

    const token = authHeader.split(' ')[1]
    try {
      const decoded = await this.jwtService.verifyAsync<any>(token, {
        secret: this.configService.get<string>('jwtAccessSecret'),
      })
      ;(request as any).user = decoded
      ;(request as any).userId = decoded.userId
      return true
    } catch (err) {
      throw new UnauthorizedException(
        err instanceof Error ? err.message : 'INVALID_OR_EXPIRED_TOKEN',
      )
    }
  }
}