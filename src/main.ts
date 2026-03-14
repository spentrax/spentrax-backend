import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Enable CORS
  app.enableCors()

  // Global API prefix
  app.setGlobalPrefix('api/v1')

  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )

  const configService = app.get(ConfigService)

  const port = configService.get<number>('port') || 3000

  await app.listen(port)

  console.log(`🚀 Spentrax backend running on http://localhost:${port}`)
  console.log(`❤️ Health check: http://localhost:${port}/api/v1/health`)
}

bootstrap()