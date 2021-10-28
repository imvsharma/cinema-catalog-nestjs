import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[
    ClientsModule.registerAsync(
      [
        {
          name: 'USER_SERVICE',
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            transport: Transport.RMQ,
            options: {
              urls: [configService.get('messageQueueUrl') as string],
              queue: configService.get('userQueueName') as string,
              queueOptions: {
                durable: false
              },
            }
          }),
          inject: [ConfigService]
        }
      ]
    )
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
