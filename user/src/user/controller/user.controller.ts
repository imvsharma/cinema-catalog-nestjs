import { Controller, Get, Inject } from '@nestjs/common';
import {EventPattern, ClientProxy} from '@nestjs/microservices';

@Controller('user')
export class UserController {

  constructor(
    @Inject('AUTH_SERVICE') private readonly client:ClientProxy
  ) {}

  @EventPattern('hello')
  async all(data) {
    console.log(data)
  }

  @Get()
  async send() {
    this.client.emit("hello", "message from user microservice");
  }
}
