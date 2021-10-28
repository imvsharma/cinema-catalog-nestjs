import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService} from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
@Module({
  imports:[
    ClientsModule.registerAsync([{
      name: 'AUTH_SERVICE',
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get('messageQueueUrl') as string],
            queue: configService.get('authQueueName') as string,
            queueOptions: {
              durable: false
            },
          }
        }),
      inject: [ConfigService]
    }]),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}