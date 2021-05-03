import { Player } from './Player.model';

export interface GamingRoom {
  id?: string;
  name?: string;
  allPlayers?: Array<Player>;
  soloMode?: boolean;
  started?: boolean;
}

export const defaultRoom: Readonly<GamingRoom> = {
  id: null,
  name: null,
  allPlayers: []
};
