import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {

  constructor(@Inject('USER_SERVICE') private userClient:ClientProxy) {

  }

  async validateUser(username:string, password:string) {
    console.log(`username and password are ${username} and ${password} respectively.`);
    const user = await this.userClient.send({ role: 'user', cmd: 'get' }, { username, password }).toPromise();
    return user;
  }
}
