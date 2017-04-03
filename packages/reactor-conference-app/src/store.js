import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import root from './reducer';
import schedule from './schedule/reducer';
import speakers from './speakers/reducer';
import calendar from './calendar/reducer';

const initialState = { };

const middleware = [
    applyMiddleware(thunk)
];

if (window.devToolsExtension) middleware.push(window.devToolsExtension())

const store = createStore(
    combineReducers({ root, schedule, speakers, calendar }), 
    initialState, 
    compose(...middleware)
);

export default store;