import { createUserDtoType } from "src/user/types/createUserDto.type";

export class CreateUserDto {
  private _id: string
  private _username: string;
  private _password: string;
  private _name: string;
  private _email: string;

  constructor (user: createUserDtoType) {
    this._id = user.id;
    this._username = user.username;
    this._password = user.password;
    this._email = user.email;
    this._name = user.name;
  }

  public get id (): string {
    return this._id;
  }

  public set id (id: string) {
    this._id = id;
  }

  public get username (): string {
    return this._username;
  }

  public set username (username: string) {
    this._username = username;
  }

  public get password (): string {
    return this._password;
  }

  public set password (password: string) {
    this._password = password;
  }

  public get name (): string {
    return this._name;
  }

  public set name (name: string) {
    this._name = name;
  }

  public get email (): string {
    return this._email;
  }

  public set email (email: string) {
    this._email = email;
  }
  
}