import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('USER_SERVICE') private readonly client:ClientProxy
  ) {}

  @Get()
  async all() {
    console.log('Auth service');
    this.client.emit('hello', 'Hello from Auth service');
    return 'Hello from Auth service';
  }

  @EventPattern('hello')
  async get(data) {
    console.log(data)
  }
}
