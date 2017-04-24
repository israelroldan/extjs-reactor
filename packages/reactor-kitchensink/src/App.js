import React from 'react'
import Layout from './Layout';  
import { Router, Route, Link, hashHistory } from 'react-router'
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import reducer from './reducer';
import { routeDidChange } from './actions';

const store = createStore(
    reducer, 
    undefined, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// load new component when the route changes
hashHistory.listen(location => store.dispatch(routeDidChange(location)));

// load the component for the initial route
store.dispatch(routeDidChange(hashHistory.getCurrentLocation()));

export default function App() {
    return (
        <Provider store={store}>
            <Router history={hashHistory}>
                <Route path="*" component={Layout}/>
            </Router>
        </Provider>
    )
}