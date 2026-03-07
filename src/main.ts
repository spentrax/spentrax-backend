import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PORT } from "./common/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix("api/v1");

  await app.listen(PORT);

  console.log(`🚀 Spentrax backend running on http://localhost:${PORT}`);
  console.log(`❤️ Health check: http://localhost:${PORT}/api/v1/health`);
}

bootstrap();
