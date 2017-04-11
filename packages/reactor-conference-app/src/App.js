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
import Speaker from './speakers/Speaker';

import { loadEvent, unloadEvent } from './event/actions';
import { loadSpeaker, unloadSpeaker } from './speakers/actions';

// load new component when the route changes
hashHistory.listen(location => store.dispatch(routeDidChange(location)));

// load the component for the initial route
store.dispatch(routeDidChange(hashHistory.getCurrentLocation()));

export default function App() {
    const eventRoute = (
        <Route 
            path=":id" 
            component={Event} 
            onEnter={({params}) => store.dispatch(loadEvent(params.id))}
            onLeave={() => {
                if (!location.hash.match(/\/\d+$/)) {
                    store.dispatch(unloadEvent());
                }
            }}
        />
    )

    return (
        <Provider store={store}>
            <Router history={hashHistory}>
                <Route path="/" component={Layout}>
                    <IndexRoute component={Schedule}/>
                    <Route path="events" component={Schedule}>
                        { eventRoute }
                    </Route>
                    <Route path="/speakers" component={Speakers}>
                        <Route
                            path=":id"
                            component={Speaker}
                            onEnter={({params}) => store.dispatch(loadSpeaker(params.id))}
                            onLeave={() => {
                                if(!location.hash.match(/speakers\/\d+$/)) {
                                    store.dispatch(unloadSpeaker());
                                }
                            }}
                        />
                    </Route>
                    <Route path="/calendar" component={Calendar}>
                        { eventRoute }
                    </Route>
                    <Route path="/notifications" component={Notifications}/>
                    <Route path="/attendees" component={Attendees}/>
                    <Route path="/about" component={About}/>
                </Route>
            </Router>
        </Provider>
    )
}