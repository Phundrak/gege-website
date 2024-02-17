import type { RecordAuthResponse } from "pocketbase";
import { User, type IUser } from "./User";

interface IAuthenticatedUser {
  id: string,
  name?: string,
  username: string,
  email: string,
  avatarUrl?: string,
  accessToken: string,
  refreshToken: string,
  rawUser?: { [key: string]: any };
}

export interface IOAuthResponse extends RecordAuthResponse<IUser> {
  token: string,
  record: IUser,
  meta?: IAuthenticatedUser
}

class AuthenticatedUser implements IAuthenticatedUser {
  id: string;
  name?: string;
  username: string;
  email: string;
  avatarUrl?: string;
  accessToken: string;
  refreshToken: string;
  rawUser?: { [key: string]: any; };

  constructor(from: IAuthenticatedUser) {
    this.id = from.id;
    this.name = from.name;
    this.username = from.username;
    this.email = from.email;
    this.avatarUrl = from.avatarUrl;
    this.accessToken = from.accessToken;
    this.refreshToken = from.refreshToken;
    this.rawUser = from.rawUser;
  }
}

export class OAuthResponse implements IOAuthResponse {
  token: string;
  record: User;
  meta?: AuthenticatedUser;

  constructor(from: RecordAuthResponse<IUser>) {
    this.token = from.token;
    this.record = new User(from.record);
    if(from.meta) {
      this.meta = new AuthenticatedUser(from.meta as IAuthenticatedUser);
    }
  }
}
