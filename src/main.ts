import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix("api/v1");

  const configService = app.get(ConfigService);

  const port = configService.get<number>("port");

  await app.listen(port);

  console.log(`🚀 Spentrax backend running on http://localhost:${port}`);
  console.log(`❤️ Health check: http://localhost:${port}/api/v1/health`);
}

bootstrap();
