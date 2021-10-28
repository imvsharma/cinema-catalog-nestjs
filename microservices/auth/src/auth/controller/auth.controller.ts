import { Body, Controller, Get, HttpCode, HttpStatus, Inject, RequestMapping, RequestMethod } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { AuthService } from 'src/auth/service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient:ClientProxy,
    private authService:AuthService
  ) {}

  @RequestMapping({path: '/', method: RequestMethod.POST})
  @HttpCode(HttpStatus.OK)
  async login(@Body() user) {
    return await this.authService.validateUser(user.username, user.password);
  }

  @EventPattern('hello')
  async get(data) {
    console.log(data)
  }
}
