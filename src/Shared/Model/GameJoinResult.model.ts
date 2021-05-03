import { Player } from './Player.model';

export interface GameJoinResult {
    joined?: boolean;
    message?: string;
    players?: Array<Player>;
}