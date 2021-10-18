import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import {ClientsModule, Transport} from '@nestjs/microservices'
@Module({
  imports:[
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://fhtklkfe:EJxdQHHWkoJLbLSQ44r2X4QgJdLHqQT3@snake.rmq2.cloudamqp.com/fhtklkfe'],
          queue: 'auth_microservice_queue',
          queueOptions: {
            durable: false
          },
        },
      }
    ])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
