import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import reducer, { IRootState } from '../Shared/Reducers';
import websocketMiddleware from './websocket-middleware';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import DevTools from './devtools';

const defaultMiddlewares = [
  thunkMiddleware,
  promiseMiddleware,
  loadingBarMiddleware(),
  websocketMiddleware,
];
const composedMiddlewares = middlewares =>
  process.env.NODE_ENV === 'development'
    ? compose(applyMiddleware(...defaultMiddlewares, ...middlewares), DevTools.instrument())
    : compose(applyMiddleware(...defaultMiddlewares, ...middlewares));

const initialize = (initialState?: IRootState, middlewares = []) => createStore(reducer, initialState, composedMiddlewares(middlewares));

export default initialize;
