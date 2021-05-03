import axios from 'axios';
import {
    ICrudPutAction,
} from '../../../Crud';

import { REQUEST, SUCCESS, FAILURE } from '../action-type.util';
import { cleanEntity } from '../../entity-utils';

import { ApiResult, defaultResult } from '../../Model/AipResult.model';
import { GamingRoom } from '../../Model/GamingRoom.model';
import { Player } from '../../Model/Player.model';

export const ACTION_TYPES = {
    ROLL_DICE: 'gaming/ROLL_DICE',
    START_GAME: 'gaming/START_GAME',
    END_GAME: 'gaming/END_GAME',
};

const initialState = {
    starting: false,
    started: false,
    rolling: false,
    rolled: false,
    ending: false,
    ended: false,
    result: defaultResult,
};

export type GamingServiceState = Readonly<typeof initialState>;

// Reducer

export default (state: GamingServiceState = initialState, action): GamingServiceState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.ROLL_DICE):
            return {
                ...state,
                rolling: true,
                rolled: false,


            }
        case REQUEST(ACTION_TYPES.START_GAME):
            return {
                ...state,
                starting: true,
                ended: false
            }
        case REQUEST(ACTION_TYPES.END_GAME):
            return {
                ...state,
                ending: true,
                started: false
            };
        case FAILURE(ACTION_TYPES.ROLL_DICE):
            return {
                ...state,
                rolling: false,
                rolled: false,
                result: action.payload.data,
            };
        case FAILURE(ACTION_TYPES.START_GAME):
            return {
                ...state,
                starting: false,
                started: false,
                result: action.payload.data,
            };
        case FAILURE(ACTION_TYPES.END_GAME):
            return {
                ...state,
                ending: false,
                ended: false,
                result: action.payload.data,
            };
        case SUCCESS(ACTION_TYPES.ROLL_DICE):
            return {
                ...state,
                rolling: false,
                rolled: true,
                result: action.payload.data,
                started: !(action.payload?.data?.entity?.winner === true),
                ended: action.payload?.data?.entity?.winner === true,
            };
        case SUCCESS(ACTION_TYPES.START_GAME):
            return {
                ...state,
                starting: false,
                started: true,
                result: action.payload.data,
            };
        case SUCCESS(ACTION_TYPES.END_GAME):
            return {
                ...state,
                ending: false,
                ended: true,
                result: action.payload.data,
            };
        default:
            return state;
    }
};

const apiUrl = 'api/games';

// Actions
export const rollDice: ICrudPutAction<ApiResult, Player> = player => async dispatch => {
    const url = `${apiUrl}/roll`;
    const result = await dispatch({
        type: ACTION_TYPES.ROLL_DICE,
        payload: axios.post(url, player),
    });
    return result;
};

export const startGame: ICrudPutAction<ApiResult, string> = roomId => async dispatch => {
    const url = `${apiUrl}/start/${roomId}`;
    const result = await dispatch({
        type: ACTION_TYPES.START_GAME,
        payload: axios.get(url),
    });
    return result;
};

export const endGame: ICrudPutAction<ApiResult, string> = roomId => async dispatch => {
    const url = `${apiUrl}/end/${roomId}`;
    const result = await dispatch({
        type: ACTION_TYPES.END_GAME,
        payload: axios.get(url),
    });
    return result;
};