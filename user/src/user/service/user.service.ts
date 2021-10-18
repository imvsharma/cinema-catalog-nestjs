import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UserService {
  private readonly users = [
    {
      userId: 1,
      username: 'admin',
      password: 'admin',
    },
    {
      userId: 2,
      username: 'test',
      password: 'test',
    },
  ];

  async findOne(username:string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

}
