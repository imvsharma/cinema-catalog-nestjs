import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Logger, Param, Post, RequestMapping, RequestMethod } from '@nestjs/common';
import {EventPattern, ClientProxy, MessagePattern} from '@nestjs/microservices';
import * as uuid from 'uuid';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { CreateUserRequest } from 'src/user/model/request/createUser.request';
import { CreateUserResponse } from 'src/user/model/response/createUser.response';
import { UserService } from 'src/user/service/user.service';
import { User } from 'src/user/entity/user.entity';
import { createUserResponseData } from 'src/user/types/createUserResponse.type';
import { hashedPassword } from 'src/user/utils/user.helper';
import { createUserRequestType } from 'src/user/types/createUserRequest.type';
import { createUserDtoType } from 'src/user/types/createUserDto.type';

@Controller('user')
export class UserController {
  private readonly logger:Logger = new Logger(UserController.name);

  constructor(
    @Inject('AUTH_SERVICE') private readonly client:ClientProxy,
    private userService:UserService
  ) {}

  @RequestMapping({path: '/', method: RequestMethod.POST})
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() user: createUserRequestType): Promise<CreateUserResponse> {
    const req:CreateUserRequest = new CreateUserRequest(user);
    const hashPassword = await hashedPassword(req.password);
    const userDetails: createUserDtoType = {
      id: uuid.v4(),
      username: req.username,
      name: req.name,
      password: hashPassword,
      email: req.email
    }
    const createUserDto: CreateUserDto = new CreateUserDto(userDetails);
    const savedUser:User = await this.userService.createUser(createUserDto);
    this.logger.log(`CreateUser :: getting saved from database :: savedUser : ${JSON.stringify(savedUser)}`)
    if(savedUser && savedUser["name"] && savedUser["username"] && savedUser["email"]) {
      const getUserDetails: createUserResponseData = {
        name: savedUser.name,
        username: savedUser.username,
        email: savedUser.email
      }
      return new CreateUserResponse(true, "User created successfully", getUserDetails);
    }
  }

  @RequestMapping({path: '/', method: RequestMethod.GET})
  @HttpCode(HttpStatus.OK)
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @RequestMapping({path: '/:id', method: RequestMethod.GET})
  @HttpCode(HttpStatus.OK)
  async getUser(@Param() id:string): Promise<User> {
    return this.userService.getUser(id);
  }

  @MessagePattern({ 'role': 'user', 'cmd': 'get' })
  async validateUser (userDetails:any) {
    return await this.userService.validateUser(userDetails.username, userDetails.password);
  }

}
