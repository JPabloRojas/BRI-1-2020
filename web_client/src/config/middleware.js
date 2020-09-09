// @ts-nocheck
import { applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

export const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  sagaMiddleware,
];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger());
}

export default applyMiddleware(...middlewares);
