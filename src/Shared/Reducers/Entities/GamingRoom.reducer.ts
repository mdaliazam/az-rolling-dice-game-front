import axios from 'axios';
import {
    ICrudGetAction,
    ICrudGetAllAction,
    ICrudPutAction,
    ICrudDeleteAction
} from '../../../Crud';

import { REQUEST, SUCCESS, FAILURE } from '../action-type.util';
import { cleanEntity } from '../../entity-utils';

import { ApiResult, defaultResult } from '../../Model/AipResult.model';
import { GamingRoom } from '../../Model/GamingRoom.model';

export const ACTION_TYPES = {
    FETCH_ROOM_LIST: 'room/FETCH_ROOM_LIST',
    FETCH_ROOM: 'room/FETCH_ROOM',
    CREATE_ROOM: 'room/CREATE_ROOM',
    UPDATE_ROOM: 'room/UPDATE_ROOM',
    DELETE_ROOM: 'room/DELETE_ROOM',
};

const initialState = {
    loading: false,
    errorMessage: null,
    result: defaultResult,
    updating: false,
    totalItems: 0,
    updateSuccess: false,
};

export type GamingRoomState = Readonly<typeof initialState>;

// Reducer

export default (state: GamingRoomState = initialState, action): GamingRoomState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.FETCH_ROOM_LIST):
        case REQUEST(ACTION_TYPES.FETCH_ROOM):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true,
            };
        case REQUEST(ACTION_TYPES.CREATE_ROOM):
        case REQUEST(ACTION_TYPES.UPDATE_ROOM):
        case REQUEST(ACTION_TYPES.DELETE_ROOM):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true,
            };
        case FAILURE(ACTION_TYPES.FETCH_ROOM_LIST):
        case FAILURE(ACTION_TYPES.FETCH_ROOM):
        case FAILURE(ACTION_TYPES.CREATE_ROOM):
        case FAILURE(ACTION_TYPES.UPDATE_ROOM):
        case FAILURE(ACTION_TYPES.DELETE_ROOM):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                result: action.payload.data,
            };
        case SUCCESS(ACTION_TYPES.FETCH_ROOM_LIST):
            return {
                ...state,
                loading: false,
                result: action.payload.data,
                totalItems: parseInt(action.payload.headers['x-total-count'], 10),
            };
        case SUCCESS(ACTION_TYPES.FETCH_ROOM):
            return {
                ...state,
                loading: false,
                result: action.payload.data,
            };
        case SUCCESS(ACTION_TYPES.CREATE_ROOM):
        case SUCCESS(ACTION_TYPES.UPDATE_ROOM):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                result: action.payload.data,
            };
        case SUCCESS(ACTION_TYPES.DELETE_ROOM):
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

const apiUrl = 'api/rooms';

// Actions
export const getAllRooms: ICrudGetAllAction<ApiResult> = () => {
    return {
        type: ACTION_TYPES.FETCH_ROOM_LIST,
        payload: axios.get<ApiResult>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
    };
};

export const getRoomById: ICrudGetAction<ApiResult, string> = id => {
    const requestUrl = `${apiUrl}/${id}`;
    return {
        type: ACTION_TYPES.FETCH_ROOM,
        payload: axios.get<ApiResult>(requestUrl),
    };
};

export const createRoom: ICrudPutAction<ApiResult, GamingRoom> = (entity: GamingRoom) => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.CREATE_ROOM,
        payload: axios.post(apiUrl, cleanEntity(entity)),
    });
    dispatch(getAllRooms());
    return result;
};

export const updateRoom: ICrudPutAction<ApiResult, GamingRoom> = entity => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.UPDATE_ROOM,
        payload: axios.put(apiUrl, cleanEntity(entity)),
    });
    return result;
};

export const deleteRoom: ICrudDeleteAction<ApiResult, string> = id => async dispatch => {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await dispatch({
        type: ACTION_TYPES.DELETE_ROOM,
        payload: axios.delete(requestUrl),
    });
    dispatch(getAllRooms());
    return result;
};