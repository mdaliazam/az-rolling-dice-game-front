import { Player } from './Player.model';

export interface RollingResult {
    winner?: boolean;
    total?: number;
    currentValue?: number;
    nextPlayer?: Player;
    currentPlayer?: Player;
}

