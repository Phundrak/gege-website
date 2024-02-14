import { type RecordModel } from 'pocketbase';
import { type User } from './User';

interface CampaignDetails {
  game_master?: User;
  players?: User[];
}

export interface Campaign extends RecordModel {
  expand?: CampaignDetails;
  game_master: string;
  name: string;
  players: string[];
}

export interface NewCampaign {
  game_master: string | null;
  name: string | null;
  players: string[];
}
