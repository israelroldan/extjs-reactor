import React from 'react'
import Layout from './Layout';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import { Provider } from 'react-redux';

import store from './store';
import { routeDidChange } from './actions';

import Schedule from './schedule/Schedule';
import Speakers from './speakers/Speakers';
import Calendar from './calendar/Calendar';
import Maps from './maps/Maps';
import Notifications from './notifications/Notifications';
import Attendees from './attendees/Attendees';
import About from './about/About';
import Event from './event/Event';

import { loadEvent } from './event/actions';

// load new component when the route changes
hashHistory.listen(location => store.dispatch(routeDidChange(location)));

// load the component for the initial route
store.dispatch(routeDidChange(hashHistory.getCurrentLocation()));

export default function App() {
    return (
        <Provider store={store}>
            <Router history={hashHistory}>
                <Route path="/" component={Layout}>
                    <IndexRoute component={Schedule}/>
                    <Route path="/events/:id" component={Event} onEnter={({params}) => store.dispatch(loadEvent(params.id))}/>
                    <Route path="/speakers" component={Speakers}/>
                    <Route path="/calendar" component={Calendar}/>
                    <Route path="/maps" component={Maps}/>
                    <Route path="/notifications" component={Notifications}/>
                    <Route path="/attendees" component={Attendees}/>
                    <Route path="/about" component={About}/>
                </Route>
            </Router>
        </Provider>
    )
}