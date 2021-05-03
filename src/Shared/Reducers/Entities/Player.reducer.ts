import axios from 'axios';
import {
    ICrudPutAction,
} from '../../../Crud';

import { REQUEST, SUCCESS, FAILURE } from '../action-type.util';
import { cleanEntity } from '../../entity-utils';

import { ApiResult, defaultResult } from '../../Model/AipResult.model';
import { Player } from '../../Model/Player.model';

export const ACTION_TYPES = {
    FETCH_PLAYER_LIST: 'player/FETCH_PLAYER_LIST',
    FETCH_PLAYER: 'player/FETCH_PLAYER',
    CREATE_PLAYER: 'player/CREATE_PLAYER',
    UPDATE_PLAYER: 'player/UPDATE_PLAYER',
    DELETE_PLAYER: 'player/DELETE_PLAYER',
};

const initialState = {
    loading: false,
    errorMessage: null,
    result: defaultResult,
    updating: false,
    totalItems: 0,
    updateSuccess: false,
};

export type PlayerState = Readonly<typeof initialState>;

// Reducer

export default (state: PlayerState = initialState, action): PlayerState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.FETCH_PLAYER_LIST):
        case REQUEST(ACTION_TYPES.FETCH_PLAYER):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true,
            };
        case REQUEST(ACTION_TYPES.CREATE_PLAYER):
        case REQUEST(ACTION_TYPES.UPDATE_PLAYER):
        case REQUEST(ACTION_TYPES.DELETE_PLAYER):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true,
            };
        case FAILURE(ACTION_TYPES.FETCH_PLAYER_LIST):
        case FAILURE(ACTION_TYPES.FETCH_PLAYER):
        case FAILURE(ACTION_TYPES.CREATE_PLAYER):
        case FAILURE(ACTION_TYPES.UPDATE_PLAYER):
        case FAILURE(ACTION_TYPES.DELETE_PLAYER):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: action.payload,
            };
        case SUCCESS(ACTION_TYPES.FETCH_PLAYER_LIST):
            return {
                ...state,
                loading: false,
                result: action.payload.data,
                totalItems: parseInt(action.payload.headers['x-total-count'], 10),
            };
        case SUCCESS(ACTION_TYPES.FETCH_PLAYER):
            return {
                ...state,
                loading: false,
                result: action.payload.data,
            };
        case SUCCESS(ACTION_TYPES.CREATE_PLAYER):
        case SUCCESS(ACTION_TYPES.UPDATE_PLAYER):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                result: action.payload.data,
            };
        case SUCCESS(ACTION_TYPES.DELETE_PLAYER):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                result: action.payload.data,
            };
        default:
            return state;
    }
};

const apiUrl = 'api/players';

// Actions
export const joinPlayer: ICrudPutAction<ApiResult, Player> = entity => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.CREATE_PLAYER,
        payload: axios.post(apiUrl, cleanEntity(entity)),
    });
    return result;
};