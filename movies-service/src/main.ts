import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger("App");
  const app = await NestFactory.create(AppModule);
  await app.listen(80, () => {
    logger.log(`Movies microservices is running on ${process.env.port} port`)
  })
}

bootstrap();
