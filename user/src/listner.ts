import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,{
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://fhtklkfe:EJxdQHHWkoJLbLSQ44r2X4QgJdLHqQT3@snake.rmq2.cloudamqp.com/fhtklkfe'],
      queue: 'user_microservice_queue',
      queueOptions: {
        durable: false
      },
    },
  })

  app.listen().then(() => {
    console.log("User microservices is listening...");
  });
}
bootstrap();
