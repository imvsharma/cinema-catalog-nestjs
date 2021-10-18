import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports:[ClientsModule.register([
    {
      name: 'USER_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: ['amqps://fhtklkfe:EJxdQHHWkoJLbLSQ44r2X4QgJdLHqQT3@snake.rmq2.cloudamqp.com/fhtklkfe'],
        queue: 'user_microservice_queue',
        queueOptions: {
          durable: false
        },
      },
    }
  ])],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
