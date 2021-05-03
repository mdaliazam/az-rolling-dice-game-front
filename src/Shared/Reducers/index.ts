import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

// prettier-ignore
import gamingRoom, {
    GamingRoomState
} from './Entities/GamingRoom.reducer';

import player, {
    PlayerState
} from './Entities/Player.reducer';

import game, {
    GamingServiceState
} from './Entities/GamingService.reducer';

export interface IRootState {
    readonly gamingRoom: GamingRoomState;
    readonly player: PlayerState;
    readonly game: GamingServiceState;
}

const rootReducer = combineReducers<IRootState>({
    game,
    gamingRoom,
    player,
});

export default rootReducer;