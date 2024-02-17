import { type RecordModel } from 'pocketbase';
import { CRecordModel } from './Base';
import { of, type Observable } from 'rxjs';

export interface ISimpleUser extends RecordModel {
  username: string;
  name?: string;
  avatar?: string;
  expand?: { [key: string]: any };
}

export interface IUser extends SimpleUser {
  email?: string;
  emailVisibility: boolean;
  verified: boolean;
}

export class SimpleUser extends CRecordModel implements ISimpleUser {
  avatar?: string;
  username: string;
  name?: string;
  expand?: { [key: string]: any };

  constructor(from: ISimpleUser) {
    super(from);
    this.username = from.username;
    this.name = from.name;
    this.expand = from.expand;
    this.avatar = from.avatar;
  }

  displayName(): string {
    if (this.name && this.name.trim() !== '') {
      return this.name;
    }
    return this.username;
  }

  avatarLink(pbStore: any, thumbSize: number = 100): Observable<string | null> {
    return this.avatar
      ? (pbStore.users.avatar(this.id, thumbSize) as Observable<string | null>)
      : of(null);
  }
}

export class User extends SimpleUser implements IUser {
  email?: string;
  emailVisibility: boolean;
  verified: boolean;

  constructor(from: IUser) {
    super(from);
    this.email = from.email;
    this.emailVisibility = from.emailVisibility;
    this.verified = from.verified;
  }
}
