import React, { Component } from 'react'
import Layout from './Layout';
import { Router, Route, Link, hashHistory } from 'react-router'
import Home from './Home';
import code from './code';
import * as examples from './examples';

export default class App extends Component {

    constructor(props) {
        super(props);
    }

    onRoute(route) {
        if (route.location.action === 'PUSH') {
            console.log('onRoute', route.location.pathname.replace(/\//, ''));
        }
    }

    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/:component" component={Layout}/>
            </Router>
        )
    }
}