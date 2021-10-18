import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';


async function bootstrap() {
  const logger:Logger = new Logger("BootstrapAuthApp");
  const app = await NestFactory.create(AppModule)
  try {
    app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
        urls: [''],
        queue: 'auth_microservice_queue',
        queueOptions: {
          durable: false
        },
      },
    });
    await app.startAllMicroservices();
    await app.listen(8081);
    logger.log("Auth microservice is running")
  } catch (err) {
    logger.error(`Error in bootstarping auth microservice : ${err}`);
  }
}
bootstrap();
