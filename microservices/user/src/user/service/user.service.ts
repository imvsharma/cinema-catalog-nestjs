import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/entity/user.entity';
import { isMatch } from 'src/user/utils/user.helper';
import { Repository, SelectQueryBuilder } from 'typeorm';


interface UserServiceInterface {
  createUser(userDetails: CreateUserDto): Promise<User>
  getUsers(): Promise<User[]>
  getUser(id:string): Promise<User>
}

@Injectable()
export class UserService implements UserServiceInterface{
  private logger:Logger = new Logger(UserService.name);

  constructor (
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}


  public async createUser(userDetails: CreateUserDto): Promise<User> {
    this.logger.log(`CreateUser :: getting userDetails from controller :: userDetails : ${JSON.stringify(userDetails)}`);
    const user: User = {
      id: userDetails.id,
      username: userDetails.email,
      password: userDetails.password,
      name: userDetails.name,
      email: userDetails.email,
      createdAt: new Date()
    }
    return this.userRepository.save(user);
  }

  public async getUsers(): Promise<User[]> {
    return this.userRepository.find()
  }

  public async getUser(id: string): Promise<User>{
    return this.userRepository.findOne(id);
  }

  public async validateUser(username:string, password:string):Promise<any> {
    const user = await this.userRepository.createQueryBuilder("user").where("user.username = username",{username}).addSelect("user.password").getOne();
    console.log(user);
    const isMatched = await isMatch(password, user.password);
    if(isMatched) {
      return user;
    } else {
      console.log("not matched");
    }
  }



  // this.userRepository.createQueryBuilder("user").where("user.id = uuid(id)",{id}).addSelect("user.password").getOne()
}
