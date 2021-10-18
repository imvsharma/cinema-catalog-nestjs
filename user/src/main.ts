import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Transport} from '@nestjs/microservices'

async function bootstrap() {
  const logger:Logger = new Logger("BootstrapAuthApp");
  const app = await NestFactory.create(AppModule);
  try {
    app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
        urls: ['amqps://fhtklkfe:EJxdQHHWkoJLbLSQ44r2X4QgJdLHqQT3@snake.rmq2.cloudamqp.com/fhtklkfe'],
        queue: 'user_microservice_queue',
        queueOptions: {
          durable: false
        },
      },
    });
    await app.startAllMicroservices();
    await app.listen(8082);
    logger.log("User microservice is running")
  } catch (err) {
    logger.error(`Error in bootstarping user microservice : ${err}`);
  }
}
bootstrap();
