import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.setGlobalPrefix('api/v1')
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

  const configService = app.get(ConfigService)
  const port = configService.get<number>('port') || 3000

  await app.listen(port)
  console.log(`Spentrax backend running on http://localhost:${port}`)
}

bootstrap()
