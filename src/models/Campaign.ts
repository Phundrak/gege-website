import { type RecordModel } from 'pocketbase';
import { User, type IUser } from './User';
import { CRecordModel } from './Base';

interface ICampaignDetails {
  game_master?: IUser;
  players?: IUser[];
}

export interface ICampaign extends RecordModel {
  expand?: CampaignDetails;
  game_master: string;
  name: string;
  players: string[];
}

class CampaignDetails implements ICampaignDetails {
  game_master?: User;
  players: User[] = [];

  constructor(from: ICampaignDetails) {
    if (from.game_master) {
      this.game_master = new User(from.game_master);
    }
    if (from.players) {
      from.players.forEach((player) => this.players.push(new User(player)));
    }
  }
}

export class Campaign extends CRecordModel implements ICampaign {
  expand?: CampaignDetails;
  game_master: string;
  name: string;
  players: string[];

  constructor(from: ICampaign) {
    super(from);
    this.expand = undefined;
    this.game_master = from.game_master;
    this.name = from.name;
    this.players = from.players;
    this.expand = from.expand ? new CampaignDetails(from.expand) : undefined;
  }
}

export interface NewCampaign {
  game_master: string | null;
  name: string | null;
  players: string[];
}
