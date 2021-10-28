import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import {ConfigService} from '@nestjs/config';

async function bootstrap() {
  const logger:Logger = new Logger("BootstrapAuthApp");
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  try {
    app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
        urls: [config.get('messageQueueUrl') as string],
        queue: config.get('messageQueueName') as string,
        queueOptions: {
          durable: false
        },
      },
    });
    await app.startAllMicroservices();
    await app.listen(config.get('port') as number);
    logger.log(`${config.get('microservice')} microservice is running on ${config.get('port') as number} port`)
  } catch (err) {
    logger.error(`Error in bootstarping auth microservice : ${err}`);
  }
}
bootstrap();
