import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import root from './reducer';
import schedule from './schedule/reducer';
import speakers from './speakers/reducer';
import event from './event/reducer';

const initialState = { };

const middleware = [
    applyMiddleware(thunk)
];

if (window.devToolsExtension) middleware.push(window.devToolsExtension())

const store = createStore(
    combineReducers({ root, schedule, speakers, event }),
    initialState,
    compose(...middleware)
);

export default store;