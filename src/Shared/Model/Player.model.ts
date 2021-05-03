export interface Player {
    id?: string;
    nickName?: string;
    position?: string;
    totalScore?: number;
    startRolling?: boolean;
    roomId?: string;
    currentScore?: number;
}

export const defaultValue: Readonly<Player> = {
    id: null,
    nickName: null
};
