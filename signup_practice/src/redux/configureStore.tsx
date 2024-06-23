import { createStore,compose,applyMiddleware } from 'redux';
import modules from './modules';
import penderMiddleware from 'redux-pender/lib/middleware';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__?: () => any;
        __REDUX_DEVTOOLS_COMPOSE__?: typeof compose;
    }
}

const isDevelopment = process.env.NODE_ENV === 'development';
const composeEnhancers = isDevelopment ? (window.__REDUX_DEVTOOLS_COMPOSE__ || compose) : compose;

export default function configureStore(initialState?: any) {
    const store = createStore(modules, initialState, composeEnhancers(
        applyMiddleware(penderMiddleware())
    ));
    return store;
}