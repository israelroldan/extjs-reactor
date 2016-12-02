import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, Link, hashHistory } from 'react-router'
import Users from './Users';
import Groups from './Groups';
import Layout from './Layout';

/**
 * The main application view
 */
export default class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MuiThemeProvider>
                <Router history={hashHistory}>
                    <Route path="/" component={Layout}>
                        <Route path="/users" component={Users}/>
                        <Route path="/groups" component={Groups}/>
                    </Route>
                </Router>
            </MuiThemeProvider>
        )
    }

}
