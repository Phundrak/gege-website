import type { RecordModel } from 'pocketbase';

export interface SimpleUser extends RecordModel {
  username: string;
  name?: string;
}

export interface User extends SimpleUser {
  avatar?: string;
  email?: string;
  emailVisibility: boolean;
  verified: boolean;
}

export function displayName(user: SimpleUser): string {
  if (user.name && user.name.trim() !== '') {
    return user.name;
  }
  return user.username;
}
