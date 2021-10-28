import { createUserResponseData } from "src/user/types/createUserResponse.type";

export class CreateUserResponse {
  private _success: boolean;
  private _message: string;
  private _user: createUserResponseData | null

  constructor (success: boolean, message: string, user: createUserResponseData) {
    this._success = success;
    this._message = message;
    this._user = user
  }

  public get success (): boolean {
    return this._success;
  }

  public set success (success: boolean) {
    this._success = success;
  }

  public get message (): string {
    return this._message;
  }

  public set message (message: string) {
    this._message = message;
  }

  public get user (): createUserResponseData {
    return this._user;
  }

  public set name (user: createUserResponseData) {
    this._user = user;
  }
  
}